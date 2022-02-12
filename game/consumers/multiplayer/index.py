
from channels.generic.websocket import AsyncWebsocketConsumer
import json
from django.core.cache import cache

class MultiPlayer(AsyncWebsocketConsumer):
    async def connect(self):

        self.room_name = None

        for i in range(1000):
            name = "room-%d" % (i)
            if not cache.has_key(name) or len(cache.get(name)) < 3:
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
                    'id':player['id']
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
                'id':str(len(players)),
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
                    'id':str(len(players)-1),
                }
            )

    async def group_send(self,data):
        await self.send(text_data=json.dumps(data))

    async def receive(self, text_data):
        data = json.loads(text_data)
        if data['event'] == 'create_player':
            await self.create_player(data)

