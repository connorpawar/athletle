import type { Option } from "~/components/Misc/AutoComplete";

export const levenshteinDistance = (str1 = "", str2 = ""): number => {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();
    const track = Array(str2.length + 1)
        .fill(null)
        .map(() => Array(str1.length + 1).fill(null) as number[]);
    for (let i = 0; i <= str1.length; i += 1) {
        track[0][i] = i;
    }
    for (let j = 0; j <= str2.length; j += 1) {
        track[j][0] = j;
    }
    for (let j = 1; j <= str2.length; j += 1) {
        for (let i = 1; i <= str1.length; i += 1) {
            const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
            track[j][i] = Math.min(
                track[j][i - 1] + 1, // deletion
                track[j - 1][i] + 1, // insertion
                track[j - 1][i - 1] + indicator // substitution
            );
        }
    }
    return track[str2.length][str1.length];
};

export const levenshteinSorter = (options: Option[], value: string, limit: number): Option[] => {
    const distances = new Map(
        options.map(
            (opt) => [opt.label, levenshteinDistance(opt.label.slice(0, value.length), value)] as [string, number]
        )
    );
    const sorted = options.sort((a, b) => (distances.get(a.label) ?? 0) - (distances.get(b.label) ?? 0));
    return sorted.slice(0, limit);
};
