# Kunterbunt

Gestalte die Dionysos-Mosaike mit frischen Farben neu und ergänze fehlerhafte Stellen nach deinen Vorstellungen.

* hol dir die [Web-App](https://tursics.de/app/kunterbunt/)
* ein Projekt mit Kulturdaten von [Coding da Vinci: Nieder.Rhein.Land 2021](https://codingdavinci.de/de/projekte/kunterbunt)
* schau dir den [Quelltext](https://github.com/tursics/kunterbunt) an

![Kunterbunt-Logo](https://github.com/tursics/kunterbunt/blob/main/media/banner.png?raw=true)

Das **Dionysos-Mosaik in Köln** besteht aus über 1,5 Millionen Steinen.
Leider enthält es einige Fehlstellen und keiner weiß, wie die Motive in der **ehemaligen römischen Stadtvilla** einmal vollständig ausgesehen haben.
Jetzt kannst **du** die leeren Stellen im Mosaik kreativ füllen.
Wähle eine Farbe und färbe die fehlenden Steine zu einem neuen Gesamtkunstwerk zusammen.

Mit **Kunterbunt** ist eine Web-Applikation entstanden, die nicht nur die fehlenden Steine im Mosaik ergänzen kann.
Du kannst jeden beliebigen Stein im Mosaik umfärben.
Für deine Kreativität stehen mehrere Teil-Motive des großen Mosaiks und eine große Auswahl an wohlabgestimmten Farbpaletten zur Verfügung.
Wähle selbst, ob du kolorierte oder komplett weiße Steine als Vorlage haben möchtest.

Egal ob am **PC, Tablet oder Smartphone** - malen kannst du überall.
Da jeder Stein per Hand für die Malvorlage nachgemalt wurde, entstehen hochaufgelöste Bilder, die du mit deinen Freund:innen **teilen und ausdrucken** kannst.

Motive mit wenigen Steinen sind besser für Einsteiger geeignet; und für Kinder.
Das Deutsche Technikmuseum bietet für Kinder spezielle **Ausmalbilder mit Pixeln** an.
Diese sind in der App bereits integriert.

*Der Kern der Anwendung hat sich zu einer JavaScript-Bibliothek zum editieren/färben von beliebigen SVG-Grafiken entwickelt, mobile first und touch-freundlich.
Es macht Sinn diesen Teil in Zukunft auszulagern und zum Beispiel als npm-Paket anderen Projekten und Webseiten zur Verfügung zu stellen.*

## Warum das ganze?

Dieses Projekt ist mein Beitrag zum Hackathon "Coding da Vinci Nieder.Rhein.Land 2021".
Die Arbeitszeit des Projektes fand zwischen dem 11.09.2021 und 06.11.2021 statt.

Projektwebseite: https://codingdavinci.de/de/projekte/kunterbunt

## Features

**erledigt**

- &check; Besseren Namen für das Projekt finden
- &check; SVG-Ausmal-Editor
- &check; Farbe auswählen und losmalen
- &check; Stift malt eine Fläche mit einer Farbe aus
- &check; Undo und Redo
- &check; Multi-Touch erlauben
- &check; Bilder in 2 Variante (bunt und weiß)
- &check; 14 Bild-Vorlagen können ausgewählt werden
- &check; 29 wunderschöne Farbpaletten stehen zur Auswahl
- &check; Funktionsleisten passt sich automatisch Hoch- und Querformat an
- &check; läuft im Browser
- &check; optimiert für Computer
- &check; optimiert für Tablets
- &check; optimiert für Telefone
- &check; optimiert für Drucker (wer das Bild drucken möchte, der bekommt eine wunderschöne Ansicht :-) )
- &check; zeige einen QR-Code um auf die Lizenz zu verlinken - beim drucken
- &check; Stift-Bedienung auf Touch-Bildschirmen
- &check; mehrere Farbpaletten können in `media/colorswatch.js` hinterlegt werden (mit bis zu 10 Farben)
- &check; Social Sharing (2000 Pixel breit oder hoch) für mobile Geräte (JPG-Datei)
- &check; Social Sharing wird im Desktop-Browser zum Download-Button (PNG-Datei)
- &check; Bild und Metadaten erstellt, wenn man die Webseite über Social Media teilt
- &check; App Icon erstellt (für alle möglichen Größen)
- &check; die letzten 5 angefangenen Bilder speichern und wieder auswählbar machen

**offen**

- Bugs sind alle gefixt (besonders die auf Safari und iOS)
- Helligkeit von Farben ändern können
- Pinsel soll eine Fläche mit einer Farbe wählen, wobei die Helligkeit automatisch variiert
- Bilder als Video abspeichern / teilen (die Undo-Funktion hält entsprechende Daten)
- SVGs von der Festplatte / URL importieren
- Hauptfunktion als Library in npm auslagern
- benutze Facebook um Bilder auf mehreren Geräten zu synchronisieren

## Bilder vorbereiten

- TIFF oder PNG in Inkscape öffnen
- als SVG speichern
- Werkzeug "Bézir-Kurven und gerade Linien zeichnern (B)" auswählen
- jedes Kästchen mit 5 Klicks nachmalen (4 Ecken plus Pfad schließen)
- einige Kästchen können 3 oder mehr als 4 Ecken haben
- Werkzeug "Farben aus dem Bild übernehmen (D)" auswählen
- eine typische Farbe aus dem Kästchen auswählen
- nächstes Kästchen malen

Für jedes Kästchen also:

- Taste B drücken
- 5 Mausklicks
- Taste D drücken
- 1 Mausklick

Zum Abschluß

- Bild als SVG-Datei im Ordner `media` speichern
- Bild mit der App "ImageOptim" kleiner rechnen (spart ca. 70%)
- `config.js` im `media`-Ordner öffnen
- Bild mit Metadaten referenzieren

## Trivia

Für ein Kästchen/Mosaikstein benötige ich (wenn alles gut läuft) **ca. 8 Sekunden** zum zeichnen.

Bild-Motiv         |Mosaiksteine  |brutto Arbeitszeit
-------------------|--------------|------------------
Blume              |          478 | 1 bis 2 Stunden
Ente komplett      |         3507 | 8 bis 16 Stunden
Ente ausgeschnitten|          705 |
Mänade und Satyr   |11397 (8171 bunt + 3226 weiß) | 20 bis 38 Stunden
Mänade             |         1944 |
Satyr              |         1760 |

## Lizenzen

Der *Source-Code* steht unter der freien **MIT**-Lizenz.

Die *Bilder* stehen unter der freien **CC BY-SA 3.0 DE**-Lizenz mit dem Zusatz "Rheinisches Bildarchiv Köln / Römisch Germanisches Museum Köln / [Fotograf*in]".
Mehr Infos auf [Coding da Vinci](https://codingdavinci.de/daten/das-mosaik-einer-luxurioesen-stadtvilla-des-roemischen-koeln).

Die *Icons* stehen unter freien **CC BY 4.0**-Lizenz. Danke [Font Awesome](https://fontawesome.com/v5.15/icons?d=gallery&p=2&m=free).

Die *Farbpaletten* von [Trending color palettes](https://coolors.co/palettes/trending) sind frei verwendbar [Our colors and their combination are not protected by any kind of copyright or intellectual property. You can, therefore, use them freely without any permission or any reference to Coolors](https://help.coolors.co/hc/en-us/articles/360010649799-Do-I-need-special-permissions-to-use-your-colors-).

Der Font *[Cookie](https://fonts.google.com/specimen/Cookie)* steht unter der freien [Open Font License](https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL).
