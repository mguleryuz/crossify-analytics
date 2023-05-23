export function reduceOpacity(hexColor: string) {
  // Remove '#' symbol from the hex color
  hexColor = hexColor.replace('#', '')

  // Extract the RGB values from the hex color
  const red = parseInt(hexColor.substring(0, 2), 16)
  const green = parseInt(hexColor.substring(2, 4), 16)
  const blue = parseInt(hexColor.substring(4, 6), 16)

  // Convert the RGB values to the desired opacity (30%)
  const opacity = 0.3

  // Create the RGBA color string
  const rgbaColor = `rgba(${red}, ${green}, ${blue}, ${opacity})`

  return rgbaColor
}
