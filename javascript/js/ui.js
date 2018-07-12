var dateChecker = function() {
    var date = new Date();
    alert(date);
}
dateChecker();

var mother = function(func) {
    func();
};
var children = function() {
    alert('안녕하세요');
};
mother(children);