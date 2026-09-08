import ImageSlider from "./ImageSlider.js"


const sliderElement =
    document.getElementById("slider")


const slider =
    new ImageSlider(
        sliderElement,
        {
            position:50
        }
    )