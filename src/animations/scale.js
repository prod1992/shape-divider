import anime from "animejs";

(function (anime) {
    let dividerSVG = document.querySelector("svg"),
        animatingShape = document.querySelector("[data-animation]"),
        animationOptions;


    if (!!animatingShape) {
        animationOptions = {
            targets: dividerSVG,
            ease: "easeInOutSine",
            duration: animatingShape.dataset.animationDuration,
            autoplay: false,
            direction: "alternate"
        }
        if (animatingShape.dataset.animation === "scale") {
            animationOptions.height = "*=" + animatingShape.dataset.animationValue;
            animationOptions.width = "*=" + animatingShape.dataset.animationValue;
            // correct marginLeft calculation
            animationOptions.marginLeft = "-=" + (((animatingShape.dataset.animationValue * 100) / animatingShape.dataset.animationValue) * (animatingShape.dataset.animationValue - 1) / 2) + "%";
        }
        const animation = anime(animationOptions);
        dividerSVG.addEventListener(animatingShape.dataset.animationPlayOn, function () {
            animation.play();
        });
        dividerSVG.addEventListener(animatingShape.dataset.animationPauseOn, function () {
            animation.pause();
            if (animation.progress > 99.9) {
                animation.reverse();
                animation.play();
            } else {
                setTimeout(animation.play, 100)
            }
        });
    }

})(anime);