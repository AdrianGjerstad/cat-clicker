let data = {
  cookie_consent: null,

  name: null,
  level: 1,

  cats: 0,
  cat_click_amt: 1,

  petters: 0,
  petter_ps: 0.1,
  petter_cost: 10,

  feeders: 0,
  feeder_ps: 0.5,
  feeder_cost: 20,

  settings: {
    update_rate: 10,
  }
};

const max_level = 2;

function level() {
  return Math.max(Math.min(max_level, data.level), 1);
}

function plural(value, floor=true) {
  if(floor) return Math.floor(value) === 1 ? "" : "s";
  return value === 1 ? "" : "s";
}

$(window).on("load", function() {

(function() {

let keys = Object.keys(data);
for(let i = 0; i < keys.length; ++i) {
  if(keys[i] === "settings") {
    let keys_b = Object.keys(data.settings);
    for(let j = 0; j < keys_b.length; ++j) {
      data.settings[keys_b[j]] = (localStorage.getItem("catclicker.settings" + keys_b[j]) || data.settings[keys_b[j]]);
    }
    continue;
  }
  data[keys[i]] = (localStorage.getItem("catclicker." + keys[i])||data[keys[i]])
}

if(data.name === null) {
  data.name = [
    "Bao Bao",
    "Mei Xiang",
    "Tai Shan",
    "Lun Lun",
    "Bei Bei",
    "Bai Yun",
    "Hua Mai",
    "Xiang Xiang",
    "Su Lin",
    "Zhen Zhen"
  ][Math.floor(Math.random()*10)];
}

$(".name").text(data.name);

let ticking_interval;

function tick() {
  data.cats += (data.petters * data.petter_ps)/data.settings.update_rate;
  data.cats += (data.feeders * data.feeder_ps)/data.settings.update_rate;

  $(".cat-count").text(Math.floor(data.cats));

  $(".petter-count").text(data.petters);
  $(".petter-ps").text(data.petter_ps);
  $(".petter-cost").text(data.petter_cost + " Cat" + plural(data.petter_cost));
  $(".feeder-count").text(data.feeders);
  $(".feeder-ps").text(data.feeder_ps);
  $(".feeder-cost").text(data.feeder_cost + " Cat" + plural(data.feeder_cost));
  if(data.cats >= data.petter_cost) {
    $(".petter-cost")[0].style.color = "lightgreen";
  } else {
    $(".petter-cost")[0].style.color = "red";
  }

  if(data.cats >= data.feeder_cost) {
    $(".feeder-cost")[0].style.color = "lightgreen";
  } else {
    $(".feeder-cost")[0].style.color = "red";
  }
}

ticking_interval = setInterval(tick, 1000/data.settings.update_rate);

})();

let buy_count = 1;

$("#version").on("click", function() {
  window.location.href = "https://github.com/AdrianGjerstad/cat-clicker/issues/new";
});

$(".centerpiece")[0].src = "./media/cat_lv" + level() + ".png";
$(".centerpiece")[0].title = "Level " + level();

$(".cat-button").on("click", function() {
  data.cats += data.cat_click_amt;
});

$(".cat-button").on("contextmenu", function(e) {
  e.preventDefault();
  data.cats += data.cat_click_amt;
})

$(".petter-upgrade").on("click", function() {
  if(data.cats >= data.petter_cost) {
    data.petters += buy_count;
    data.cats -= data.petter_cost;

    adjustPetterCost();
  }
});

function adjustPetterCost() {
  data.petter_cost = Math.floor(data.petter_cost * 1.07 + 3);
}

$(".feeder-upgrade").on("click", function() {
  if(data.cats >= data.feeder_cost) {
    data.feeders += buy_count;
    data.cats -= data.feeder_cost;

    adjustFeederCost();
  }
});

function adjustFeederCost() {
  data.feeder_cost = Math.floor(data.feeder_cost * 1.13 + 5);
}

});