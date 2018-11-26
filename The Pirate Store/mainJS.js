/** Used to adjust total quantity. */
var totQuantity = document.querySelector(".quantity");
/** Used to adjust total price. */
var totPrice = document.querySelector(".price");
/** Used to adjust total savings. */
var totSaving = document.querySelector(".saving");
/** Refrence to the savings text at the bottom of page */
var text = totSaving.parentNode;
/** Used to indicate whether there was one of each DVD.*/
var allDecreasedDvd = false;
/** Used to indicate whether there was one of each Blu-ray.*/
var allDecreasedBlu = false;

/** Action when the decrease or increase button is clicked */
$("button").click(function() {
  var getter = this.parentNode.parentNode;
  /** Goes up until getter is at the "div.row" tag. */
  var singQuant = getter.children[1].children[0];
  if (this.className == "decrease") {
    /** Decrease the quantity by 1 if quantity is greater than 1.*/
    if (Number(singQuant.innerHTML) <= 0) {
      singQuant.innerHTML = 0;
    } else {
      singQuant.innerHTML = Number(singQuant.innerHTML) - 1;
    }
  } else {
    /** Increase the quantity by 1.*/
    singQuant.innerHTML = Number(singQuant.innerHTML) + 1;
  }
  /** Goes up until divider is at the "tr" tag. */
  while (getter.tagName != "TR") {
    getter = getter.parentNode;
  }
  /** Set variable singPrice to update the proper movie price/cost. */
  var singPrice = getter.children[3];
  while (singPrice.tagName != "DIV") {
    singPrice = singPrice.children[0];
  }
  /** Checks if DVD or Blu-Ray */
  if (getter.className == "dvd") {
    allDecreasedDvd = updater(singQuant, singPrice, getter);
  } else {
    allDecreasedBlu = updater(singQuant, singPrice, getter);

  }
  /** Update total Price and Quantity */
  var updatePricedvd = document.getElementsByClassName("singPricedvd");
  var updatePriceblu = document.getElementsByClassName("singPriceblu");
  var updateQuantD = document.getElementsByClassName("singQuantdvd");
  var updateQuantB = document.getElementsByClassName("singQuantblu");
  var show;
  var total = 0;
  var saving = 0;
  for (var i = 0; i < updateQuantD.length; i++) {
    total += Number(updateQuantD[i].innerHTML);
    if (allDecreasedDvd) {
      show = document.getElementById("savDv");
      show.className = "unhidden";
      saving += Number(updateQuantD[i].innerHTML) * 2;
    }
  }
  for (var j = 0; j < updateQuantB.length; j++) {
    total += Number(updateQuantB[j].innerHTML);
    if (allDecreasedBlu) {
      show = document.getElementById("savBl");
      show.className = "unhidden";
      if (allDecreasedDvd) {
        show = document.getElementById("and1");
        show.className = "unhidden";
      }
      saving += Number(updateQuantB[j].innerHTML) * 3.75;
    }
  }
  totQuantity.innerHTML = total;
  total = 0;
  for (var k = 0; k < updatePricedvd.length; k++) {
    total += Number(updatePricedvd[k].innerHTML);
  }
  for (var m = 0; m < updatePriceblu.length; m++) {
    total += Number(updatePriceblu[m].innerHTML);
  }
  /** Update savings statement and total Price */
  show = document.getElementById("savBulk");
  if (Number(totQuantity.innerHTML) >= 100) {
    saving += total * 0.05;
    total = total * 0.95;
    show.className = "unhidden";
    show = document.getElementById("and2");
    if (allDecreasedDvd || allDecreasedBlu) {
      show.className = "unhidden";
    } else {
      show.className = "hidden";
      show = document.getElementById("and2");
      show.className = "hidden";
    }
  } else {
    show.className = "hidden";
    show = document.getElementById("and2");
    show.className = "hidden";
  }
  show = document.getElementById("savDv");
  if (allDecreasedDvd) {
    show.className = "unhidden";
  } else {
    show.className = "hidden";
  }
  show = document.getElementById("savBl");
  if (allDecreasedBlu) {
    show.className = "unhidden";
    show = document.getElementById("and1");
    if (allDecreasedDvd) {
      show.className = "unhidden";
    } else {
      show.className = "hidden";
    }
  } else {
    show.className = "hidden";
    show = document.getElementById("and1");
    show.className = "hidden";
  }
  totPrice.innerHTML = Math.round(total * 100) / 100;
  if (saving > 0) {
    text.className = "unhidden";
    totSaving.innerHTML = saving;
  } else {
    text.className = "hidden";
    totSaving.innerHTML = saving;
  }

});

function checker(type) {
  var disks = document.getElementsByClassName("singQuant" + type);
  for (var i = 0; i < disks.length; i++) {
    if (Number(disks[i].innerHTML) <= 0) {
      return false;
    }
  }
  return true;
}
function updater(singQuant, singPrice, getter) {
  var price;
  var disc;
  var aD;
  if (getter.className == "dvd") {
    price = 20;
    disc = 0.9;
    aD = allDecreasedDvd;
  } else {
    price = 25;
    disc = 0.85;
    aD = allDecreasedBlu;
  }
  singPrice.innerHTML = Number(singQuant.innerHTML) * price;
  if (aD) {
    singPrice.innerHTML = Number(singPrice.innerHTML) * disc;
  }
  var getDVD = document.getElementsByClassName("singPrice" + getter.className)
  if (!aD && checker(getter.className)) {
    aD = true;
    for (var a = 0; a < getDVD.length; a++) {
      getDVD[a].innerHTML = Number(getDVD[a].innerHTML) * disc;
    }
  } else if (aD && !checker(getter.className)) {
    aD = false;
    for (var b = 0; b < getDVD.length; b++) {
      getDVD[b].innerHTML = Number(getDVD[b].innerHTML) / disc;
    }
  }
  return aD;
}
