enum Genre{
    Rock,
    CountryAndWestern,
    Classical,
    Pop,
    HeavyMetal,
}

class MusicCollection{
    private readonly collection: Map<Genre, string[]>;
    
    constructor() {
        this.collection = new Map<Genre, string[]>();
    }

    public Add(genre: Genre, artists: string[]): void{
        for (let artist of artists) {
            this.AddArtist(genre, artist);
        }
    }

    public AddArtist(genre: Genre, artist: string): void{
        if (!this.collection.has(genre)) {
            this.collection.set(genre, []);
        }
        let artists = this.collection.get(genre);
        if (artists) {
            artists.push(artist);
        }
    }

    public Get(genre: Genre): string[] | undefined{
        return this.collection.get(genre);
    }
}

let collection = new MusicCollection();
collection.Add(Genre.Classical, [`Debussy`, `Bach`, `Elgar`, `Beethoven`]);
collection.Add(Genre.CountryAndWestern, [`Dolly Parton`, `Toby Keith`, `Willie Nelson`]);
collection.Add(Genre.HeavyMetal, [`Tygers of Pan Tang`, `Saxon`, `Doro`]);
collection.Add(Genre.Pop, [`Michael Jackson`, `Abba`, `The Spice Girls`]);
collection.Add(Genre.Rock, [`Deep Purple`, `Led Zeppelin`, `The Dixie Dregs`]);


collection.AddArtist(Genre.HeavyMetal, 'jack');

console.log(collection.Get(Genre.HeavyMetal));