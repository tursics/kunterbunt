# Dionysos-Mosaik

Römisch-Germanisches Museum der Stadt Köln

Das Mosaik in einer luxuriösen Stadtvilla des römischen Köln

Coding da Vinci Nieder.Rhein.Land 2021

## Lizenzen

Der *Source-Code* steht unter der freien **MIT**-Lizenz.

Die *Bilder* stehen unter der freien **CC BY-SA 3.0 DE**-Lizenz mit dem Zusatz "Rheinisches Bildarchiv Köln / Römisch Germanisches Museum Köln / [Fotograf*in]".
Mehr Infos auf [Coding da Vinci](https://codingdavinci.de/daten/das-mosaik-einer-luxurioesen-stadtvilla-des-roemischen-koeln).

Die *Icons* stehen unter freien **CC BY 4.0**-Lizenz. Danke [Font Awesome](https://fontawesome.com/v5.15/icons?d=gallery&p=2&m=free).

Die *Farbpaletten* von [Trending color palettes](https://coolors.co/palettes/trending) sind frei verwendbar [Our colors and their combination are not protected by any kind of copyright or intellectual property. You can, therefore, use them freely without any permission or any reference to Coolors](https://help.coolors.co/hc/en-us/articles/360010649799-Do-I-need-special-permissions-to-use-your-colors-).

## Features

**erledigt**

- SVG-Ausmal-Editor
- Farbe auswählen und losmalen
- Stift malt eine Fläche mit einer Farbe aus
- Undo und Redo
- mehrere Bild-Vorlagen können ausgewählt werden
- Bilder in 2 Variante (bunt und weiß)
- Funktionsleisten können an allen 4 Rändern angeordnet werden
- läuft im Browser
- optimiert für Computer
- optimiert für Tablets

**noch offen**

- Helligkeit von Farben ändern können
- Pinsel soll eine Fläche mit einer Farbe wählen, wobei die Helligkeit automatisch variiert
- für Telefone optimieren
- eventuell für Deckenbeamer optimieren
- Bilder lokal speichern
- Bilder als Foto abspeichern
- Bilder als Video abspeichern
- Social Sharing erlauben
- Multi-Touch erlauben

## Bilder vorbereiten

- TIFF oder PNG in Inkscape öffnen
- als SVG speichern
- Werkzeug "Bézir-Kurven und gerade Linien zeichnern (B)" auswählen
- jedes Kästchen mit 5 Klicks nachmalen (4 Ecken plus Pfad schließen)
- einige Kästchen können 3 oder mehr als 4 Ecken haben
- Werkzeug "Farben aus dem Bild übernehmen (D)" auswählen
- eine typische Farbe aus dem Kästchen auswählen
- nächstes Kästchen malen

Für jedes Kästchen als:

- Taste B drücken
- 5 Mausklicks
- Taste D drücken
- 1 Mausklick

Zum Abschluß

- Bild als SVG-Datei im Ordner `media` speichern
- `config.js` im `media`-Ordner öffnen
- Bild mit Metadaten referenzieren

## Software-Ideen

- [Paint by number generator](https://drake7707.github.io/paintbynumbersgenerator/index.html)
- [color by number](https://jsfiddle.net/shockey8oz/v54dqtgd/)
- [Color by number pixel art](https://codepen.io/mathhulk/pen/VwaXOXR)
