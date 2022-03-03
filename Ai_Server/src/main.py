#! /usr/bin/env python3

import glob
import sys
sys.path.insert(0, glob.glob('../../')[0])

from ai_server.ai_service import Ai


from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol
from thrift.server import TServer

from queue import Queue
from time import sleep
from threading import Thread
from random import randint
import random
import math

from acpp.asgi import channel_layer
from asgiref.sync import async_to_sync


queue = Queue()


def create_uuid():
    res = ""
    for i in range(8):
        res += str(randint(0,9))
    return res

class Room:
    def __init__(self,room_name,channel_name):
        self.room_name = room_name
        self.channel_name = channel_name
        self.time = 0
        self.boss_uuid = 0;

class Pool:
    def __init__(self):
        self.rooms =[]

    def add_room(self,room):
        print("Add room : %s" % (room.room_name))
        self.rooms.append(room)

    def remove_room(self,index):
            del self.rooms[index]

    def increase_time(self,index):
        self.rooms[index].time += 1;

    def create_ai(self,i):
        self.rooms[i].boss_uuid = create_uuid()
        async_to_sync(channel_layer.group_send)(
                self.rooms[i].room_name,
                {
                    'type': 'group_send',
                    'event': 'create_boss',
                    'uuid': self.rooms[i].boss_uuid,
                    'username': "boss",
                    'photo':"https://www.lijiamiao.top/static/image/playground/renji.jpg",
                    'id':-2,
                    'state':randint(0,1),
                }
            )


    def move_ai(self,i):
        async_to_sync(channel_layer.group_send)(
                self.rooms[i].room_name,
                {
                    'type': 'group_send',
                    'event': 'move_boss',
                    'uuid': self.rooms[i].boss_uuid,
                    'angle':random.random(),
                    'move_length':random.random(),

                }
            )
        

    def match(self):
        i = 0
        while i < len(self.rooms):
            if self.rooms[i].time > 360 :
                self.remove_room(i)
            elif self.rooms[i].time <=360 :
                i=i+1

        for i in range(len(self.rooms)):
            if self.rooms[i].boss_uuid != 0:
                self.move_ai(i)

            if self.rooms[i].time == 180:
                self.create_ai(i)

            self.increase_time(i)

class AiHandler:
    def add_room_ai(self,room_name,channel_name):
        room = Room(room_name,channel_name)
        queue.put(room)
        return 0
        
def get_room_from_queue():
    try:
        return queue.get_nowait()
    except:
        return None

def worker():
    pool = Pool()
    while True:
        room = get_room_from_queue()
        if room :
            pool.add_room(room)
        else:
            pool.match()
            sleep(1)


if __name__ == '__main__':
    handler = AiHandler()
    processor = Ai.Processor(handler)
    transport = TSocket.TServerSocket(host='127.0.0.1', port=9090)
    tfactory = TTransport.TBufferedTransportFactory()
    pfactory = TBinaryProtocol.TBinaryProtocolFactory()


    server = TServer.TThreadedServer(
         processor, transport, tfactory, pfactory)

    Thread(target=worker, daemon=True).start()

    print('Starting the server...')
    server.serve()
    print('done.')
