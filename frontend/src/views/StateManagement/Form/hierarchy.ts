export interface HierarchyNode {
  emoji: string
  name: string
  role: string
  level: number
  children?: HierarchyNode[]
}

// Árvore de componentes do exemplo (Provider -> Consumers), usada no diagrama
export const hierarchy: HierarchyNode = {
  emoji: '📦',
  name: 'FormExample.vue',
  role: 'Root · Provider',
  level: 1,
  children: [
    {
      emoji: '📄',
      name: 'FormContainer.vue',
      role: 'Consumer',
      level: 2,
      children: [
        { emoji: '📋', name: 'FormHeader.vue', role: 'Consumer', level: 3 },
        {
          emoji: '📝',
          name: 'FormBody.vue',
          role: 'Consumer',
          level: 3,
          children: [
            {
              emoji: '🔢',
              name: 'FormFieldsGroup.vue',
              role: 'Consumer',
              level: 4,
              children: [
                { emoji: '🔤', name: 'NameField.vue', role: 'Consumer', level: 5 },
                { emoji: '📧', name: 'EmailField.vue', role: 'Consumer', level: 5 },
                { emoji: '🎂', name: 'AgeField.vue', role: 'Consumer', level: 5 },
                { emoji: '✅', name: 'TermsField.vue', role: 'Consumer', level: 5 },
              ],
            },
          ],
        },
        { emoji: '⚡', name: 'FormFooter.vue', role: 'Consumer', level: 3 },
      ],
    },
  ],
}

// Cada nível de profundidade ganha um tom distinto para reforçar a hierarquia
const levelColors = ['indigo', 'blue', 'cyan', 'teal', 'green'] as const

export function levelColor(level: number): string {
  return levelColors[Math.min(level, levelColors.length) - 1] ?? 'indigo'
}
