# TRIPTYK FULLSTACK TEST 2022

## Demande de base
Dans le cadre de ce test, il vous est demandé de faire un fork de ce repository et de réaliser une api json en nodeJS permettant les fonctionnalités suivantes :

1. lors d'une requète GET sur /api/v1/todos de récupérer une liste de todos
2. lors d'une requète GET sur /api/v1/todos/**id** de récupérer le todo spécifié par l'**id**
3. lors d'une requète POST sur /api/v1/todos de créer un nouveau todo et re retourner le todo crée ainsi que le status code spécifique à la création d'un nouvel élément.
4. lors d'une requète PUT/PATCH sur /api/v1/todos/**id** de mettre à jour le todo identifié par l'**id** et re retourner le todo mis à jour.


### La structure du todo au format JSON

`{   
 uuid:'00000000-0000-0000-0000-000000000000',  
    label:'Faire mon repository',  
    done:false  
}`

## Consignes technique

- Vous pouvez utilisez nodejs et toute bibliothèque utile à vos yeux
- Vous pouvez le faire en Javascript ou Typescript
- Vous devez utilisez SQLlite pour la base de donnée
- Le résultat de votre travail devra etre sur votre repository en public

## Consignes Temporelle

- Vous avez 4h pour le test.
- Dès que vous avez terminé faites le nous savoir par mail à l'adresse dev@triptyk.eu avec le lien de votre repository.
- Une réunion de 15 minutes dans l'après midi sera organisée pour faire un code review avec vous.


### Remarques

Nous allons vérifier votre api en utilisant l'outil insomnia ou Postman.
Mettez tout sur le repository, meme si cela ne fonctionne pas, nous allons juger de ce que vous aurez réalisé dans sa globalité.
N'hésitez pas à faire des "commits" réguliers pour que nous puissions ne rien perdre de votre travail.


### Nice to have

- frontend consomant l'api
- test sur l'api
