
from channels.generic.websocket import AsyncWebsocketConsumer
import json
from django.core.cache import cache

class MultiPlayer(AsyncWebsocketConsumer):
    async def connect(self):

        self.room_name = None

        for i in range(1000):
            name = "room-%d" % (i)
            if not cache.has_key(name) or len(cache.get(name)) < 4:
                self.room_name = name
                break

        if not self.room_name:
            return

        
        await self.accept()

        if not cache.has_key(self.room_name):
            cache.set(self.room_name,[],3600)

        for player in cache.get(self.room_name): # 把之前已经有的信息分享给 自己
            await self.send(text_data=json.dumps({
                    'event':"create_player",
                    'uuid':player['uuid'],
                    'username':player['username'],
                    'photo':player['photo'],
                    'id':player['id'],
                    'work':player['work'],
                }))

        await self.channel_layer.group_add(self.room_name, self.channel_name)

    async def disconnect(self, close_code):
        print('disconnect')
        await self.channel_layer.group_discard(self.room_name, self.channel_name);

    async def create_player(self,data):
        players = cache.get(self.room_name)
        players.append({
                'uuid':data['uuid'],
                'username':data['username'],
                'photo':data['photo'],
                'id':len(players),
                'work':data['work'],
            })
        cache.set(self.room_name,players,3600)

        await self.channel_layer.group_send( #将自己的信息发给其他人
                self.room_name,
                {
                    'type':"group_send",
                    'event':"create_player",
                    'uuid':data['uuid'],
                    'username':data['username'],
                    'photo':data['photo'],
                    'id':len(players)-1,
                    'work':data['work'],
                }
            )

    async def move_to(self,data):
        await self.channel_layer.group_send(
                self.room_name,
                {
                    'type':"group_send",
                    'event':"move_to",
                    'uuid':data['uuid'],
                    'tx':data['tx'],
                    'ty':data['ty'],
                }
            )
    async def fireball(self,data):
        await self.channel_layer.group_send(
                    self.room_name,
                    {
                        'type':"group_send",
                        'event':"fireball",
                        'uuid':data["uuid"],
                        'tx':data['tx'],
                        'ty':data['ty'],
                        'ball_uuid':data['ball_uuid'],
                        'events':data['events'],
                    }
                )
    async def attack(self, data):
        await self.channel_layer.group_send(
                self.room_name,
                {
                    'type':"group_send",
                    'event':"attack",
                    'uuid':data['uuid'],
                    'attacked_uuid':data["attacked_uuid"],
                    'ball_uuid':data['ball_uuid'],
                    'angle':data['angle'],
                    'damage':data["damage"],
                    'x':data["x"],
                    'y':data['y'],
                    'events':data["events"],
                }
            )
    async def flash(self,data):
        await self.channel_layer.group_send(
                self.room_name,
                {
                    'type':"group_send",
                    'event':"flash",
                    'uuid':data['uuid'],
                    'angle':data["angle"],
                }
            )
    async def chat(self,data):
        await self.channel_layer.group_send(
                self.room_name,{
                    'type':"group_send",
                    'event':"chat",
                    'uuid':data['uuid'],
                    'massage':data['massage'],
                    'id':data['id'],
                    'mode':data['mode'],
                }
            )
    async def group_send(self,data):
        await self.send(text_data=json.dumps(data))

    async def receive(self, text_data):
        data = json.loads(text_data)
        if data['event'] == 'create_player':
            await self.create_player(data)
        elif data['event'] == 'move_to':
            await self.move_to(data)
        elif data['event'] == 'fireball':
            await self.fireball(data)
        elif data['event'] == 'attack':
            await self.attack(data)
        elif data['event'] == 'flash':
            await self.flash(data)
        elif data['event'] == 'chat':
            await self.chat(data)
