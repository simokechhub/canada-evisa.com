# Canada eVisa — assistance aux demandes d'AVE Canada (eTA)

Site bilingue (anglais à la racine, français sous `/fr`) d'assistance aux demandes
d'autorisation de voyage électronique pour le Canada, avec des pages par nationalité.

Service **privé et non gouvernemental** : la demande officielle se fait sur
canada.ca pour 7 CAD. Ce rappel figure dans le bandeau, le pied de page, le
formulaire et les CGV.

## Démarrage

```bash
npm install
npm run dev
```

Variables d'environnement : voir `.env.example` (base MySQL partagée, Stripe,
SMTP, widget Tawk.to facultatif).

## Formulaire lu depuis la base

Les champs de la demande viennent de la table `evisa_form_fields` pour la fiche
« eTA Canada » (`lib/form-fields.ts`), regroupés en étapes selon `field_groups`.
La page de demande est régénérée au plus toutes les heures : un champ ajouté ou
modifié dans l'administration apparaît sans redéploiement. La route
`/api/applications` valide les envois avec les mêmes définitions.

La fiche Canada ne contient pas de champ e-mail : le site l'ajoute en dernière étape.

## Tarifs

Définis dans `lib/site.ts` : redevance officielle 7 CAD (facturée en USD selon
`OFFICIAL_FEE_USD`, taux à confirmer) + 20 USD de frais de service.

## Contenu

- Textes : `lib/dictionary/{fr,en}.ts`
- Pages par nationalité : `data/nationalities.json`
- Guides : `app/(fr)/fr/guides/(articles)` et `app/(en)/guides/(articles)`, métadonnées dans `lib/guides.ts`
- Photo du hero : `HERO_IMAGE` dans `components/Hero.tsx`

## Après un déploiement

`node scripts/indexnow.mjs` signale les URL du sitemap à Bing (IndexNow).
