export default function(chatId){
    const val = localStorage.getItem('chat-settings');
    const settings = val ? JSON.parse(val) : {chatsWithNotifications: []};
    return !settings.chatsWithNotifications.includes(chatId);
}
