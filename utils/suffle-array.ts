/**
 * Shuffles an array using the Fisher-Yates algorithm.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} array - The array to shuffle.
 * @returns {T[]} A new array with the elements shuffled.
 *
 * @example
 * const numbers = [1, 2, 3, 4, 5];
 * const shuffledNumbers = shuffleArray(numbers);
 * console.log(shuffledNumbers);
 */

const shuffleArray = <T>(array: T[] = []): T[] => {
    const shuffled = [...array]; // Create a copy to avoid mutating the original array

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
};

export default shuffleArray;
