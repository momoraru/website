function menu(evt, projectName) {

  menufocus = document.getElementsByClassName("menufocus");
  for (i = 0; i < menufocus.length; i++) {
    menufocus[i].className = menufocus[i].className.replace(" active", "");
  }
  
  evt.currentTarget.className += " active";
}