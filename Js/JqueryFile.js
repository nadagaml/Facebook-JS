
// // Scroll arrow up
let postOfSet = $("#posts").offset().top;

$(window).scroll(function ()
{
    let wScroll = $(window).scrollTop();

    if(wScroll > postOfSet - 50)
    {
        $("#Arrow-up").fadeIn(500); 
    }

    else
    {
        $("#Arrow-up").fadeOut(500);
    }
})

$("#Arrow-up").click(function()
{
    //speed more
    // $(window).scrollTop(0)

    //speed with smoth and time 
     $("body,html").animate({scrollTop:0},500)
})