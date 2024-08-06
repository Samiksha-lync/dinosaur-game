export function getCustomStyleProperty(element, property) {
    return (
        parseFloat(getComputedStyle(element).getPropertyValue(property)) || 0
    );
}

export function setCustomStyleProperty(element, property, value) {
    element.style.setProperty(property, value);
}

export function updateCustomStyleProperty(element, property, updateValue) {
    let newValue = getCustomStyleProperty(element, property) + updateValue;
    setCustomStyleProperty(
        element,
        property,
        getCustomStyleProperty(element, property) + updateValue
    );
}