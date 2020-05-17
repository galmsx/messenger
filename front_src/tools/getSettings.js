export default function(){
    const settings = localStorage.getItem('settings');
    return settings ? JSON.parse(settings) : {notifications: false};
}