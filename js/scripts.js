// clickable div https://stackoverflow.com/a/19030696
$(document).ready(function() {
  $("[data-link]").click(function() {
    window.location.href = $(this).attr("data-link");
    return false;
  });
});

var text = [
  "That which is hateful to you do not do to another; that is the entire Torah, and the rest is its interpretation. Go study. <br><br><span>&#8212;</span>  Talmud, Shabbat 31a<br><br>",
  "In everything, do to others as you would have them do unto you; for this is the law and the Prophets. <br><br><span>&#8212;</span>  Matthew 7:12<br><br>",
  "None of you truly believes until he loves for his brother what he loves for himself. <br><br><span>&#8212;</span>  40 Hadith 13<br><br>",
  "Lay not on any soul a load which ye would not wish to be laid upon you. and desire not for any one the things ye would not desire for yourselves. <br><br><span>&#8212;</span>  Gleanings From the Writings of Baha U\'lláh, page 128<br><br>",
  "One should never do something to others that one would regard as injurious to one's own self. This, in brief, is the rule of dharma. <br><br><span>&#8212;</span>  Mahābhārata 13.113.8<br><br>",
  "Hurt not others in ways that you urself would find hurtful. <br><br><span>&#8212;</span>  Udanavarga 5:18<br><br>",
  "In happiness and suffering, in joy and grief, we should regard all creatures as we regard our own self, and should therefore refrain from inflicting upon others such injury as would appear undesirable to us if inflicted upon oursevles. <br><br><span>&#8212;</span>  Yogasastra<br><br>",
  "Zigong asked, \"Is there a single saying that one may put into practice all one's life?\" The Master said, \"That would be 'reciprocity': That which you do not desire, do not do to others.\" <br><br><span>&#8212;</span>  The Analects of Confucius 15.24<br><br>",
  "Regard your neighbor's gain as your own gain, and your neighbor's loss as your own loss. <br><br><span>&#8212;</span>  Lao Tse's Treatise on Response of the Tao<br><br>",
  "Ever mind the Rule of Three: Three times your acts return to thee. This lesson well, though must learn. Thou only gets what thee dost earn. <br><br><span>&#8212;</span>  The Rule of Three<br><br>"
];

var fonts = [
  'Satisfy',
  'Seaweed Script',
  'Damion',
  'Mr Dafoe',
  'Playball',
  'Kaushan Script',
  'Yellowtail',
  'Permanent Marker'
];
var counter = 1;
var elem = document.getElementById("quotes");
var ftime = 6000

function change() {
  $(elem).fadeTo(ftime, 0, function () {
    this.innerHTML = text[counter];
    document.getElementsByClassName('blq')[0].style.fontFamily = fonts[counter]
    counter = ++counter % text.length;
    $(this).fadeTo(ftime, 1, change)
  })
}

change()
