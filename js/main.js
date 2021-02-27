'use strict';
const form = document.querySelector('.chat-compose');
const msgLog = document.querySelector('.msg-log');

function createMsgLog(type, content) {
  const placeholder = document.createElement('div');
  if (type === 'msg-in') {
    placeholder.classList.add('msg-placeholer', 'msg-in');
  }
  if (type === 'msg-out') {
    placeholder.classList.add('msg-placeholer', 'msg-out');
  }
  const msg = document.createElement('span');
  msg.classList.add('msg-content');
  const msgContent = document.createTextNode(content);
  msg.appendChild(msgContent);
  placeholder.appendChild(msg);
  msgLog.appendChild(placeholder);
}

// use your computer IP address
const socket = io('14.248.105.56:8080', {
  reconnection: true,
  reconnectionAttempts: 1
});
socket.on('message', (data) => {
  createMsgLog('msg-in', data);
});

socket.on('connect', () => {
  form.onsubmit = function(e) {
    e.preventDefault();
    const msg = this['chat-msg'].value;
    createMsgLog('msg-out', msg);
    socket.emit('message', msg);
    this.reset();
  }
});


