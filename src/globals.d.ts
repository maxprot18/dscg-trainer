/** Version de l'application (package.json), injectée au build. */
declare const __APP_VERSION__: string
/** Nombre d'exercices vérifiés (clés : `total`, `UE4`, `UE4/ifrs`, `notion:ias16`), calculé au build. */
declare const __EXERCISE_COUNTS__: Readonly<Record<string, number>>
