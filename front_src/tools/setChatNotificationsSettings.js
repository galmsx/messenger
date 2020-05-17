export default function(chatId, enabled){
    const val = localStorage.getItem('chat-settings');
    const settings = val ? JSON.parse(val) : {chatsWithNotifications: []};
    if(!enabled){
        if(settings.chatsWithNotifications.includes(chatId)){
            return;
        }
        settings.chatsWithNotifications.push(chatId);
    }else{
        const index = settings.chatsWithNotifications.indexOf(chatId);
        settings.chatsWithNotifications.splice(index,1);
    }
    localStorage.setItem('chat-settings', JSON.stringify(settings));

}
