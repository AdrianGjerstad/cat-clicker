let data = {
  foo: 0
}

$(window).on("load", function() {

(function() {

let keys = Object.keys(data);
for(let i = 0; i < keys.length; ++i) {
  data[keys[i]] = (localStorage.getItem("catclicker." + keys[i])||data[keys[i]])
}

})()

$("#version").on("click", function() {
  alert("foo");
  window.location.href = "https://github.com/AdrianGjerstad/cat-clicker/issues/new";
});

});