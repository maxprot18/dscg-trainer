/** Version de l'application (package.json), injectée au build. */
declare const __APP_VERSION__: string
/** Nombre d'exercices vérifiés (clés : `total`, `UE4`, `UE4/ifrs`, `notion:ias16`), calculé au build. */
declare const __EXERCISE_COUNTS__: Readonly<Record<string, number>>

/** Index des exercices publiés : fichier de contenu de chaque exercice (build/exerciseIndex.ts). */
declare module 'virtual:exercise-index' {
  const index: { files: string[]; ids: Record<string, number> }
  export default index
}
