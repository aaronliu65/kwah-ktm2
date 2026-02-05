import { joinURL } from "ufo";

export default async function ({
    src,
    format = "webp",
    quality = 50,
    width = null,
    height = null,
    fit = "cover",
    position = "center",
    blur = 0,
}) {
    const { app: appConfig } = useRuntimeConfig();

    const isValidSharpFit = (input) => {
        const validFits = ["contain", "fill", "inside", "outside"];
        return validFits.includes(input);
    };

    const isValidSharpPosition = (input) => {
        const validPositions = [
            "top",
            "right top",
            "right",
            "right bottom",
            "bottom",
            "left bottom",
            "left",
            "left top",
        ];
        return validPositions.includes(input);
    };

    const renderedImg = joinURL(
        appConfig.baseURL,
        "sharp",
        `f_${format}`,
        `q_${quality}`,
        width ? `w_${width}` : "",
        height ? `h_${height}` : "",
        fit ? (isValidSharpFit(fit) ? `fit_${fit}` : "") : "",
        position
            ? isValidSharpPosition(position)
                ? `position_${position.replaceAll(" ", "_")}`
                : ""
            : "",
        blur ? `blur_${blur}` : "",
        encodeURI(src).replace(/\.([^/.]+)$/, "_$1") + `.${format}`,
        process.env.NODE_ENV == "development" ? "?mode=development" : "",
    );

    if (process.env.NODE_ENV == "prerender") {
        await useFetch(renderedImg, {
            method: "POST",
            server: true,
        });
    }

    return renderedImg;
}
