# Kanap 🛋


Cinquième projet du parcours "Développeur web" d'OpenClassroom. L'objectif est de construire un site e-commerce en JavaScript.

# Technologie utilisée

 <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />


# Objectifs

- Unifier les travaux déjà réalisés (Back-End et Front-End) en intégrant dynamiquement les éléments de l'API dans les différentes pages web avec JavaScript. 
- Mettre en place un plan de test d'acceptation.

# Architecture générale

L’application web sera composée de 4 pages :
- Une page d’accueil montrant (de manière dynamique) tous les articles disponibles à la vente.
- Une page “produit” qui affiche (de manière dynamique) les détails du produit sur lequel l'utilisateur a cliqué depuis la page d’accueil. Depuis cette page, l’utilisateur peut sélectionner une quantité, une couleur, et ajouter le produit à son panier.
- Une page “panier”. Celle-ci contient plusieurs parties :
    - Un résumé des produits dans le panier, le prix total et la possibilité de
modifier la quantité d’un produit sélectionné ou bien de supprimer celui-ci.
    - Un formulaire permettant de passer une commande. Les données du
formulaire doivent être correctes et bien formatées avant d'être renvoyées au
back-end. Par exemple, pas de chiffre dans un champ prénom.
- Une page “confirmation” :
    - Un message de confirmation de commande, remerciant l'utilisateur pour sa commande, et indiquant l'identifiant de commande envoyé par l’API.

# Informations complémentaires

- La page d’accueil
Cette page présente l’ensemble des produits retournés par l’API.
Pour chaque produit, il faudra afficher l’image de celui-ci, ainsi que son nom et le début de sa description.
En cliquant sur le produit, l’utilisateur sera redirigé sur la page du produit pour consulter celui-ci plus en détail.

- La page Produit
Cette page présente un seul produit ; elle aura un menu déroulant permettant à l'utilisateur
de choisir une option de personnalisation, ainsi qu’un input pour saisir la quantité. Ces éléments doivent être pris en compte dans le panier.

- La page Panier
Sur cette page, l’utilisateur va pouvoir modifier la quantité d’un produit de son panier ; à ce moment, le total du panier devra bien se mettre à jour.
L’utilisateur aura aussi la possibilité de supprimer un produit de son panier, le produit devra donc disparaître de la page.
Les inputs des utilisateurs doivent être analysés et validés pour vérifier le format et le type de données avant l’envoi à l’API. Il ne serait par exemple pas recevable d’accepter un prénom contenant des chiffres, ou une adresse e-mail ne contenant pas de symbole “@”. En cas de problème de saisie, un message d’erreur devra être affiché en dessous du champ correspondant.

- La page Confirmation
Sur cette page, l'utilisateur doit voir s’afficher son numéro de commande. Il faudra veiller à ce que ce numéro ne soit stocké nulle part.

- Le code source
Celui-ci devra être indenté et utiliser des commentaires en début de chaque fonction pour décrire son rôle. Il devra également être découpé en plusieurs fonctions réutilisables (nommées). Une fonction doit être courte et répondre à un besoin précis. Il ne faudrait pas avoir de longues fonctions qui viendraient répondre à plusieurs besoins à la fois. Exemple : il ne serait pas accepté de mettre une seule et unique fonction en place pour collecter, traiter et envoyer des données.

- API
Concernant l’API, des promesses devront être utilisées pour éviter les callbacks. Il est possible d’utiliser des solutions alternatives, comme fetch, celle-ci englobant la promesse. L’API n’est actuellement que dans sa première version. La requête post qu’il faudra formuler pour passer une commande ne prend pas encore en considération la quantité ni la couleur des produits achetés.


# Fonctionnement du panier

Dans le panier, les produits doivent toujours apparaître de manière regroupée par modèle et par couleur.
Si un produit est ajouté dans le panier à plusieurs reprises, avec la même couleur, celui-ci ne doit apparaître qu’une seule fois, mais avec le nombre d’exemplaires ajusté.
Si un produit est ajouté dans le panier à plusieurs reprises, mais avec des couleurs différentes, il doit apparaître en deux lignes distinctes avec la couleur et la quantité correspondantes indiquées à chaque fois.


## Back end Prerequisites ##

You will need to have `Node` and `npm` installed locally on your machine.

## Back end Installation ##

Clone this repo. From the "back" folder of the project, run `npm install`. You can then run the server with `node server`. The server should run on localhost with default `port 3000`. If the server runs on another port for any reason, this is printed to the console when the server starts, e.g. Listening on port 3001.
