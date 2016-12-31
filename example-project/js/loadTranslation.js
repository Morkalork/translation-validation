function loadTranslation(lng) {
  var url = "locales/" + lng + "/translation.json";
  console.log('Loading translations at: ' + url);
  fetch(url)
    .then(function (result) {
      console.log("Translation received, processing...");
      result.json()
        .then(function (json) {
          var resources = {};
          resources[lng] = {
            translation: json
          };
          i18next.init({
            lng: lng,
            resources: resources
          }, function (e, t) {
            document.getElementById("homeLink").innerHTML = i18next.t("mainMenu.home");
            document.getElementById("productsLink").innerHTML = i18next.t("mainMenu.products");
            document.getElementById("header").innerHTML = i18next.t("content.header");
            document.getElementById("text").innerHTML = i18next.t("content.text");
          });
        })
        .catch(function (e) {
          console.error(e);
        });
    })
    .catch(function () {
      alert("Something went f***g wrong, please reload ze page");
    });
}