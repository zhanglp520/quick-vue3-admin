/*
 *@Description: 语音库
 *@Author: 土豆哥
 *@Date: 2022-12-02 01:28:26
 * 文档地址：https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Speech_API
 */

const synth = window.speechSynthesis;

export const startSpeak = (text: string) => {
    const msg = new SpeechSynthesisUtterance(text);
    // msg.lang = "zh-CN";
    // msg.volume = 10;
    // msg.pitch = 5;
    synth.speak(msg);
};
export const stopSpeak = () => {
    synth.cancel();
};
