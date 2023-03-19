export function getIconNode(path, name, onClick) {
    const $icon = document.createElement("img");
    $icon.className = "icon";
    $icon.src = path;
    $icon.alt = name;
    if (onClick) $icon.addEventListener("click", onClick);
    return $icon;
}
