// Contenu de l'UE regroupé dans un fichier JS séparé, chargé à la demande (voir ../load.ts).
export default import.meta.glob<unknown>('/content/ue5-systemes-information/**/*.json', { eager: true, import: 'default' })
