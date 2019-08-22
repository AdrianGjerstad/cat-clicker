let data = {
  level: 2
};

const max_level = 2;

function level() {
  return Math.max(Math.min(max_level, data.level), 1);
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

$(".centerpiece")[0].src = "./media/cat_lv" + level() + ".png";
$(".centerpiece")[0].title = "Level " + level();

});