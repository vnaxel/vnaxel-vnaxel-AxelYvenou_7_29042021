# Projet 7 - Groupomania

- VueJs + vuex
- NodeJs + express + sequelize + mySQL

Lien vers le deploiement sur Github pages : https://vnaxel.github.io/p7_groupomania_deployment
(le backend est hébergé sur un serveur cloud IONOS)

Pour lancer le projet en local il faut cloner ce repository

puis

## Backend

Ouvrir le dossier "back" dans un terminal de votre éditeur puis exécuter la commande:

    npm install

puis

    nodemon serve

## Base de données

Vous devez avoir mySQL installé sur votre ordinateur

Allez dans le dossier back>config et ouvrez le fichier config.JSON,

renseignez-y votre nom d'utilisateur mySQL + votre mot de passe.

puis

Ouvrir le dossier "back" dans le terminal de votre éditeur puis exécuter la commande:

    sequelize db:create

puis

    sequelize db:migrate

## Frontend

Ouvrir le dossier "front" dans le terminal de votre éditeur puis exécuter la commande:

    npm install

puis

    npm start

sur votre navigateur allez à :

- http://localhost:8080/

## Utilisation

Pour s'inscrire, il faut renseigner :

- Une adresse email valide ou fictive
- Un pseudo (entre 3 et 15 caractères - pas de chiffres)
- Un mot de passe (de 4 à 15 caractères)

Une fois connecté vous pouvez créer des utilisateurs, changer leur image de profil, publier des posts avec une image ou non (jpg, jpeg, png, gif), les commenter.
Un utilisateur ayant l'attribut isAdmin = 1 pourra supprimer les publications & commentaires des autres utilisateurs et pourra également supprimer des utilisateurs.

Toute suppression d'un post ou utilisateur retirera du fichier de stockage les images de profil et de post relatives à cet utilisateur.

Pour attribuer le role de moderateur a un utilisateur, il faudra éxecuter la commande suivante dans le shell mySQL 

    UPDATE Users SET isAdmin = 1 WHERE id = <id de l'utilisateur>
    
Tout les utilisateurs peuvent supprimer leurs posts et commentaires ainsi que leur compte, si un post est supprimé les commentaire des autre utilisateurs sur ce post le sont également.
