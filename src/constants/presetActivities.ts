export interface PresetActivity {
  name: string;
  cost: number;
}

export const PRESET_ACTIVITIES: PresetActivity[] = [
  { name: 'Shower', cost: 2 },
  { name: 'Dishes', cost: 1 },
  { name: 'Cooking', cost: 2 },
  { name: 'Walk', cost: 2 },
  { name: 'Social', cost: 3 },
  { name: 'Screen', cost: 1 },
];
