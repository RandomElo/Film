export default function SommeArgent(somme) {
    return somme.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
