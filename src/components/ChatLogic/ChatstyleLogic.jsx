
export const ChatlogicStyling = (id, userId) => {
    if( id != userId) {
        return "left-msg"
    }
    return "right-msg"
};

export const isSameSender = (message, index) => {
    if(message.length - 1 == index) {
        return true;
    }
    return (
        index < message.length - 1 && message[index].sender._id != message[index + 1].sender._id
    )
}