(function () {
  console.log('Welcome to a pointless example');
  loadTranslation("en");

  document.getElementById("lang").addEventListener("change", function () {
    var val = document.getElementById("lang").value;
    loadTranslation(val);
  });
}());