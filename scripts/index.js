$(window).scroll(function () {
  if ($(window).scrollTop() >= 2625) {
    $(".nav").css("transform", `translateY(${$(window).scrollTop() - 2625}px)`);
  }

  
    //initial sidescroll animation and stuff
  $(".child1").css(
    "transform",
    "translateX(" + 0.0625 * $(window).scrollTop() + "vw)"
  );
  $(".textholder1").css(
    "transform",
    "translateX(-" + 0.125 * $(window).scrollTop() + "vw)"
  );
  if ($(window).scrollTop() <= 700) {
    $(".textholder2").css(
      "transform",
      "translateX(-" + 0.0625 * $(window).scrollTop() + "vw)"
    );
    $(".text1").css(
      "transform",
      "translateX(" + 0.03 * $(window).scrollTop() + "vw)"
    );
  } else if ($(window).scrollTop() <= 1400 && $(window).scrollTop() >= 948) {
    $(".textholder2").css(
      "transform",
      `translate(-43.75vw,-${
        4 * (($(window).scrollTop() * 0.0625) / 15 - 4)
      }vw)`
    );
  }
  //end

//first about fadein and out animation
  if ($(window).scrollTop() <= 1300) {
    $(".intro div").fadeOut("slow");
  }
  if ($(window).scrollTop() <= 1100) {
    $(".potrait").css(
      "transform",
      `translateX(${0.045 * $(window).scrollTop() + 15}vw`
    );
  }
  if ($(window).scrollTop() >= 1400) {
    $(".intro div").fadeIn("slow");
  }
  if ($(window).scrollTop() >= 1800) {
    $(".wrapper").css(
      "transform",
      `translateY(-${$(window).scrollTop() - 1800}px)`
    );
  }

//end



//   flip animation
  if ($(window).scrollTop() >= 2000) {
    $(".nav").addClass("anim");
    $(".nav").css("visibility", "visible");
    $(".education").addClass("anim");
    $(".education").css("visibility", "visible");
  }
  if ($(window).scrollTop() >= 2450) {
    $(".projects").addClass("anim");
    $(".projects").css("visibility", "visible");
  }
  if ($(window).scrollTop() >= 3000) {
    $(".cp").addClass("anim");
    $(".cp").css("visibility", "visible");
  }
  if ($(window).scrollTop() >= 3900) {
    $(".certificates").addClass("anim");
    $(".certificates").css("visibility", "visible");
  }
  if ($(window).scrollTop() >= 4700) {
    $(".hobbies").addClass("anim");
    $(".hobbies").css("visibility", "visible");
  }
// end



// On hover change
  $(".nav div").hover(
    function () {
      $(this).css("background-color", "white");
      $(this).children("a").css("color", "black");
    },
    function () {
      $(this).css("background-color", "black");
      $(this).children("a").css("color", "white");
    }
  );

  $(".sm a").hover(
    function () {
      $(this).css("background-color", "white");
      $(this).css("color", "black");
    },
    function () {
      $(this).css("background-color", "black");
      $(this).css("color", "white");
    }
  );

// end



//section highlight
  if ($(window).scrollTop() <= 3050 && $(window).scrollTop() > 2600) {
    $("#Ed").css({"background-color": "white","box-shadow":
    "1px 1px 1px 1px black inset,-1px -1px 1px 1px black inset"});
    $("#Ed").children("a").css("color", "black");
  } else {
    $("#Ed").css("background-color", "black");
    $("#Ed").children("a").css("color", "white");
  }
  if ($(window).scrollTop() <= 3600 && $(window).scrollTop() > 3050) {
    $("#Pr").css({"background-color": "white","box-shadow":
    "1px 1px 1px 1px black inset,-1px -1px 1px 1px black inset"});
    $("#Pr").children("a").css("color", "black");
  } else {
    $("#Pr").css("background-color", "black");
    $("#Pr").children("a").css("color", "white");
  }
  if ($(window).scrollTop() <= 4500 && $(window).scrollTop() > 3600) {
    $("#Co").css({"background-color": "white","box-shadow":
    "1px 1px 1px 1px black inset,-1px -1px 1px 1px black inset"});
    $("#Co").children("a").css("color", "black");
  } else {
    $("#Co").css("background-color", "black");
    $("#Co").children("a").css("color", "white");
  }
  if ($(window).scrollTop() <= 5250 && $(window).scrollTop() > 4500) {
    $("#Ce").css({"background-color": "white","box-shadow":
    "1px 1px 1px 1px black inset,-1px -1px 1px 1px black inset"});
    $("#Ce").children("a").css("color", "black");
  } else {
    $("#Ce").css("background-color", "black");
    $("#Ce").children("a").css("color", "white");
  }
  if ($(window).scrollTop() <= 7640 && $(window).scrollTop() > 5250) {
    $("#Ho").css({"background-color": "white","box-shadow":
    "1px 1px 1px 1px black inset,-1px -1px 1px 1px black inset"});
    $("#Ho").children("a").css("color", "black");
  } else {
    $("#Ho").css("background-color", "black");
    $("#Ho").children("a").css("color", "white");
  }
  if ($(window).scrollTop() <= 7800 && $(window).scrollTop() > 7640) {
    $("#Ph").css({"background-color": "white","box-shadow":
    "1px 1px 1px 1px black inset,-1px -1px 1px 1px black inset"});
    $("#Ph").children("a").css("color", "black");
  } else {
    $("#Ph").css("background-color", "black");
    $("#Ph").children("a").css("color", "white");
  }
//   end
});



$(".nav div").click(function () {
  if ($(this).children("a").text() == "Education") {
    $("html, body").animate({ scrollTop: "2660" }, 1000);
  }
  if ($(this).children("a").text() == "Projects") {
    $("html, body").animate({ scrollTop: "3108" }, 1000);
  }
  if ($(this).children("a").text() == "Computer proficiency") {
    $("html, body").animate({ scrollTop: "3700" }, 1000);
  }
  if ($(this).children("a").text() == "Certificates") {
    $("html, body").animate({ scrollTop: "4570" }, 1000);
  }
  if ($(this).children("a").text() == "Hobbies") {
    $("html, body").animate({ scrollTop: "5380" }, 1000);
  }
  if ($(this).children("a").text() == "Contact") {
    $("html, body").animate({ scrollTop: "7650" }, 1000);
  }
});

// corousal

(function () {
  //If you want to include more images, add the link name and URL of the image in the array list below.
  let images_list = [
    {
      url: "https://udemy-certificate.s3.amazonaws.com/image/UC-63128b89-958c-43ea-a363-92aa011fbcc2.jpg?v=1654781806000",
      name: "image 1",
      link: "",
    },
    {
      url: "https://udemy-certificate.s3.amazonaws.com/image/UC-c4ba6ed8-2920-4af7-962d-4bff9d6ba0b4.jpg?v=1629999542000",
      name: "image 2",
      link: "",
    },
    {
      url: "https://www.sololearn.com/certificates/course/en/19239438/1159/landscape/png",
      name: "image 3",
      link: "",
    },
    {
      url: "https://www.sololearn.com/certificates/course/en/19239438/1060/landscape/png",
      name: "image 4",
      link: "",
    },
  ];

  let slider_id = document.querySelector("#hcg-slider-1");

  // append all images
  let dots_div = "";
  let images_div = "";
  for (let i = 0; i < images_list.length; i++) {
    // if no link without href="" tag
    let href =
      images_list[i].link == "" ? "" : ' href="' + images_list[i].link + '"';
    images_div +=
      "<a" +
      href +
      ' class="hcg-slides"' +
      (i === 0 ? ' style="display:block"' : "") +
      ">" +
      '<img src="' +
      images_list[i].url +
      '" alt="' +
      images_list[i].name +
      '">' +
      "</a>";
    dots_div +=
      '<span class="hcg-slide-dot' +
      (i === 0 ? " dot-active" : "") +
      '" data-id="' +
      i +
      '"></span>';
  }
  slider_id.querySelector(".hcg-slider-body").innerHTML = images_div;
  slider_id.querySelector(".hcg-slide-dot-control").innerHTML = dots_div;

  let slide_index = 0;

  let images = slider_id.querySelectorAll(".hcg-slides");
  let dots = slider_id.querySelectorAll(".hcg-slide-dot");
  let prev_button = slider_id.querySelector(".hcg-slide-prev");
  let next_button = slider_id.querySelector(".hcg-slide-next");

  function showSlides() {
    if (slide_index > images.length - 1) {
      slide_index = 0;
    }
    if (slide_index < 0) {
      slide_index = images.length - 1;
    }
    for (let i = 0; i < images.length; i++) {
      images[i].style.display = "none";
      dots[i].classList.remove("dot-active");
      if (i == slide_index) {
        images[i].style.display = "block";
        dots[i].classList.add("dot-active");
      }
    }
  }

  prev_button.addEventListener(
    "click",
    function (event) {
      event.preventDefault();
      slide_index--;
      showSlides();
    },
    false
  );

  next_button.addEventListener(
    "click",
    function (event) {
      event.preventDefault();
      slide_index++;
      showSlides();
    },
    false
  );

  function dot_click(event) {
    slide_index = event.target.dataset.id;
    showSlides();
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click", dot_click, false);
  }
})();

(function () {
    //If you want to include more images, add the link name and URL of the image in the array list below.
    let images_list = [
      {
        url: "images/photography/1.jpg",
        name: "image 1",
        link: "",
      },
      {
        url: "images/photography/2.jpg",
        name: "image 2",
        link: "",
      },
      {
        url: "images/photography/3.jpg",
        name: "image 3",
        link: "",
      },
      {
        url: "images/photography/4.jpg",
        name: "image 4",
        link: "",
      },
      {
        url: "images/photography/5.jpg",
        name: "image 5",
        link: "",
      },
      {
        url: "images/photography/6.jpg",
        name: "image 6",
        link: "",
      },
    ];
  
    let slider_id = document.querySelector("#hcg-slider-2");
  
    // append all images
    let dots_div = "";
    let images_div = "";
    for (let i = 0; i < images_list.length; i++) {
      // if no link without href="" tag
      let href =
        images_list[i].link == "" ? "" : ' href="' + images_list[i].link + '"';
      images_div +=
        "<a" +
        href +
        ' class="hcg-slides"' +
        (i === 0 ? ' style="display:block"' : "") +
        ">" +
        '<img src="' +
        images_list[i].url +
        '" alt="' +
        images_list[i].name +
        '">' +
        "</a>";
      dots_div +=
        '<span class="hcg-slide-dot' +
        (i === 0 ? " dot-active" : "") +
        '" data-id="' +
        i +
        '"></span>';
    }
    slider_id.querySelector(".hcg-slider-body").innerHTML = images_div;
    slider_id.querySelector(".hcg-slide-dot-control").innerHTML = dots_div;
  
    let slide_index = 0;
  
    let images = slider_id.querySelectorAll(".hcg-slides");
    let dots = slider_id.querySelectorAll(".hcg-slide-dot");
    let prev_button = slider_id.querySelector(".hcg-slide-prev");
    let next_button = slider_id.querySelector(".hcg-slide-next");
  
    function showSlides() {
      if (slide_index > images.length - 1) {
        slide_index = 0;
      }
      if (slide_index < 0) {
        slide_index = images.length - 1;
      }
      for (let i = 0; i < images.length; i++) {
        images[i].style.display = "none";
        dots[i].classList.remove("dot-active");
        if (i == slide_index) {
          images[i].style.display = "block";
          dots[i].classList.add("dot-active");
        }
      }
    }
  
    prev_button.addEventListener(
      "click",
      function (event) {
        event.preventDefault();
        slide_index--;
        showSlides();
      },
      false
    );
  
    next_button.addEventListener(
      "click",
      function (event) {
        event.preventDefault();
        slide_index++;
        showSlides();
      },
      false
    );
  
    function dot_click(event) {
      slide_index = event.target.dataset.id;
      showSlides();
    }
  
    for (let i = 0; i < dots.length; i++) {
      dots[i].addEventListener("click", dot_click, false);
    }
  })();

(function () {
    //If you want to include more images, add the link name and URL of the image in the array list below.
    let images_list = [
      {
        url: "images/renders/7.jpg",
        name: "image 1",
        link: "",
      },
      {
        url: "images/renders/8.jpg",
        name: "image 2",
        link: "",
      },
      {
        url: "images/renders/9.jpg",
        name: "image 3",
        link: "",
      },
      {
        url: "images/renders/10.jpg",
        name: "image 4",
        link: "",
      },
      {
        url: "images/renders/11.jpg",
        name: "image 5",
        link: "",
      },
    ];
  
    let slider_id = document.querySelector("#hcg-slider-3");
  
    // append all images
    let dots_div = "";
    let images_div = "";
    for (let i = 0; i < images_list.length; i++) {
      // if no link without href="" tag
      let href =
        images_list[i].link == "" ? "" : ' href="' + images_list[i].link + '"';
      images_div +=
        "<a" +
        href +
        ' class="hcg-slides"' +
        (i === 0 ? ' style="display:block"' : "") +
        ">" +
        '<img src="' +
        images_list[i].url +
        '" alt="' +
        images_list[i].name +
        '">' +
        "</a>";
      dots_div +=
        '<span class="hcg-slide-dot' +
        (i === 0 ? " dot-active" : "") +
        '" data-id="' +
        i +
        '"></span>';
    }
    slider_id.querySelector(".hcg-slider-body").innerHTML = images_div;
    slider_id.querySelector(".hcg-slide-dot-control").innerHTML = dots_div;
  
    let slide_index = 0;
  
    let images = slider_id.querySelectorAll(".hcg-slides");
    let dots = slider_id.querySelectorAll(".hcg-slide-dot");
    let prev_button = slider_id.querySelector(".hcg-slide-prev");
    let next_button = slider_id.querySelector(".hcg-slide-next");
  
    function showSlides() {
      if (slide_index > images.length - 1) {
        slide_index = 0;
      }
      if (slide_index < 0) {
        slide_index = images.length - 1;
      }
      for (let i = 0; i < images.length; i++) {
        images[i].style.display = "none";
        dots[i].classList.remove("dot-active");
        if (i == slide_index) {
          images[i].style.display = "block";
          dots[i].classList.add("dot-active");
        }
      }
    }
  
    prev_button.addEventListener(
      "click",
      function (event) {
        event.preventDefault();
        slide_index--;
        showSlides();
      },
      false
    );
  
    next_button.addEventListener(
      "click",
      function (event) {
        event.preventDefault();
        slide_index++;
        showSlides();
      },
      false
    );
  
    function dot_click(event) {
      slide_index = event.target.dataset.id;
      showSlides();
    }
  
    for (let i = 0; i < dots.length; i++) {
      dots[i].addEventListener("click", dot_click, false);
    }
  })();

(function () {
    //If you want to include more images, add the link name and URL of the image in the array list below.
    let images_list = [
      {
        url: "images/drawings/12.jpg",
        name: "image 1",
        link: "",
      },
      {
        url: "images/drawings/13.jpg",
        name: "image 2",
        link: "",
      },
      {
        url: "images/drawings/14.jpg",
        name: "image 3",
        link: "",
      },
      {
        url: "images/drawings/15.jpg",
        name: "image 4",
        link: "",
      },
      {
        url: "images/drawings/16.jpg",
        name: "image 5",
        link: "",
      },
    ];
  
    let slider_id = document.querySelector("#hcg-slider-4");
  
    // append all images
    let dots_div = "";
    let images_div = "";
    for (let i = 0; i < images_list.length; i++) {
      // if no link without href="" tag
      let href =
        images_list[i].link == "" ? "" : ' href="' + images_list[i].link + '"';
      images_div +=
        "<a" +
        href +
        ' class="hcg-slides"' +
        (i === 0 ? ' style="display:block"' : "") +
        ">" +
        '<img src="' +
        images_list[i].url +
        '" alt="' +
        images_list[i].name +
        '">' +
        "</a>";
      dots_div +=
        '<span class="hcg-slide-dot' +
        (i === 0 ? " dot-active" : "") +
        '" data-id="' +
        i +
        '"></span>';
    }
    slider_id.querySelector(".hcg-slider-body").innerHTML = images_div;
    slider_id.querySelector(".hcg-slide-dot-control").innerHTML = dots_div;
  
    let slide_index = 0;
  
    let images = slider_id.querySelectorAll(".hcg-slides");
    let dots = slider_id.querySelectorAll(".hcg-slide-dot");
    let prev_button = slider_id.querySelector(".hcg-slide-prev");
    let next_button = slider_id.querySelector(".hcg-slide-next");
  
    function showSlides() {
      if (slide_index > images.length - 1) {
        slide_index = 0;
      }
      if (slide_index < 0) {
        slide_index = images.length - 1;
      }
      for (let i = 0; i < images.length; i++) {
        images[i].style.display = "none";
        dots[i].classList.remove("dot-active");
        if (i == slide_index) {
          images[i].style.display = "block";
          dots[i].classList.add("dot-active");
        }
      }
    }
  
    prev_button.addEventListener(
      "click",
      function (event) {
        event.preventDefault();
        slide_index--;
        showSlides();
      },
      false
    );
  
    next_button.addEventListener(
      "click",
      function (event) {
        event.preventDefault();
        slide_index++;
        showSlides();
      },
      false
    );
  
    function dot_click(event) {
      slide_index = event.target.dataset.id;
      showSlides();
    }
  
    for (let i = 0; i < dots.length; i++) {
      dots[i].addEventListener("click", dot_click, false);
    }
  })();
