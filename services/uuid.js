function id() {
    return token();
}

var rand = function () {
    return Math.random().toString(36).substr(2);
};

var token = function () {
    return rand() + rand();
};


module.exports ={
    id
}