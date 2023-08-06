# Florentiner Maler 1400-1450
Ein Onlinetool mit Datenvisualisierungen über Florentiner Maler des 15. Jahrhunderts.

Dies ist das Repositorium für meine Masterarbeit im [MA Cultural Data Studies](https://www.uni-marburg.de/de/mcdci/studium/ma-cds) am [Marburg Center for Digital Culture and Infrastructure](https://www.uni-marburg.de/de/mcdci). 

Anmerkungen und Fehlermeldungen bitte an Toni Massenberg, Antonia.Massenberg@students.uni-marburg.de.


## Inhalt
Die Daten in diesem Projekt stammen aus den Florentiner Catasto-Steuerdaten der Jahre 1427, 1431, 1433, 1442, 1447, 1451 und 1458, älteren Prestanze-Listen aus 1400 und 1410/1412, Büchern der Lukasgilde und der Arte dei Medici e Speziali sowie zusätzlicher Archivmaterialien, hier zitiert nach Werner Jacobsen, "Die Maler von Florenz zu Beginn der Renaissance", München 2001.

## Nutzung der ```painters-master.csv```
In der Tabelle ```painters-master.csv``` wurden grundlegende Daten zu den 313 zwischen 1400 und 1450 in Florenz nachweisbaren Malern aufbereitet. Diese beziehen sich vor allem auf die Angaben im Regestenteil von "Die Maler von Florenz", andernfalls befinden sich in der Spalte "Zuschreibungsdiskussion Seite" ein Verweis auf den Ort der Information.
Die Spalten zu ```name```, ```zweitname```, ```birth```, ```death``` richten sich nach dem [MIDAS-Handbuch](https://www.online.uni-marburg.de/lido/midas-lido-crm-wiki/index.php/MIDAS). Wo vorhanden wurden die GND- und Wikidata-IDs ergänzt. Die Spalte ```heute noch berühmt?``` richtet sich nach Jacobsens Einschätzung in "Die Maler von Florenz", S. 60, die Spalte ```zuschreibungsfähig?``` für die Wand- und Tafelmaler sowie Miniaturisten gleichermaßen nach S. 207f. Die Abkürzungen dort sind: ü = Existenz eines Bildes ist überliefert, er = Bild ist erhalten, dok = die Mitarbeit am Bild ist dokumentiert, sign = das Bild ist signiert, in Werkstatt = zwar ist der Maler nicht direkt für die Mitarbeit an einem erhaltenen Bild dokumentiert, ist aber zum Entstehungszeitpunkt als Mitarbeiter des überlieferten Malers nachgewiesen.

Die ```Berufsgruppe``` richtet sich nach Jacobsens Einteilung (Details siehe [Projektwebsite](https://tonimassenberg.github.io/FlorentinerMaler/index.html#grundbegriffebutton)), ```job``` ist die vereinheitlichte Formulierung desselben.

 Unter den Spaltennamen ```Sohn```, ```Vater```, ```Bruder```, ```andere Verwandschaft```, ```Ausbildung```, ```Arbeitsverhältnis``` und ```Partner``` wurden Jacobsens Angaben zu den jeweiligen Verbindungen eines Künstlers übernommen. Unter den Spaltennamen ```fatherOf```, ```brotherOf```, ```uncleOf```, ```otherFamily```, ```teacherOf``` und ```masterOf``` wurde dieser Informationsgehalt standardisiert: einerseits durch den vollständigen Namen (```label```) der Person, andererseits indem die Eintragung standardisiert und von Dopplungen befreit wird, also steht der Sohn immer beim Vater, nicht der Vater beim Sohn.

## Nutzung der Kartenvisualisierungsdaten
Alle Dateien zu den Kartenvisualisierungen befinden sich im Ordner ```assets```.
Der Plan ```basicmap``` (als JPG und SVG vorhanden) basiert auf dem Stadtplan des Ruggero Ricci von 1831, mit Abwandlungen in Anlehnung an die Pläne in "Die Maler von Florenz".
Die Annotationen in den JSON-Dateien wurden im [VGG Image Annotator](https://www.robots.ox.ac.uk/~vgg/software/via/) erstellt. Eine inhaltliche Erklärung findet sich auf der [Projektwebsite](https://tonimassenberg.github.io/FlorentinerMaler/map.html). Je nach Plan finden sich in den Dateien die Koordinaten zu Regionen oder Punkten sowie beschreibende Informationen zu den jeweiligen Annotationen. Unter Nutzung der modularen Funktionen in ```map.js``` können die unterschiedlichen Darstellungsweisen der interaktiven Karte übernommen werden. 

## Nutzung der Netzwerkdaten
Alle zur Generierung der Netzwerke notwendigen Daten finden sich im Ordner ```network```.
Sie basieren auf [SigmaJS](https://github.com/jacomyal/sigma.js/) V1, exportiert aus Gephi. Sowohl die JavaScript- als auch die CSS-Dateien wurden für das vorliegende Projekt verändert, die Abwandlungen sind im Code dokumentiert.
Die Daten unter dem Namen ```regesten``` basieren auf den Regestenteil in "Die Maler von Florenz", die Dateien unter ```chapter8``` entsprechen Jacobsens Herleitung in Kapitel 8 des Buches.
Die .config-Dateien bestimmen die Dateiherkunft und Darstellung der beiden Netzwerke. Die jeweiligen JSON-Dateien enthalten die Knoten- und Kanteninformationen, auf denen die Netzwerke basieren. Durch die GEXF-Dateien können Sie die Netzwerke direkt in Gephi importieren oder sie auf GephiLite ([Regesten-Netzwerk](https://gephi.org/gephi-lite/?gexf=https://tonimassenberg.github.io/FlorentinerMaler/network/regesten.gexf), [Kapitel8-Netzwerk](https://gephi.org/gephi-lite/?gexf=https://tonimassenberg.github.io/FlorentinerMaler/network/chapter8.gexf)) bearbeiten.

## Lizenz

[GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/)

Bitte beachten Sie, dass zur vollständigen Urheberangabe dieser Daten auch die Zitation nach Werner Jacobsen, "Die Maler von Florenz zu Beginn der Renaissance", München 2001 gehört.

Bild Paolo_di_Dono_Die_Schlacht_von_San_Romano.jpg: Paolo Uccello, "Die Schlacht von San Romano", &copy; [Uffizi Galleries](https://www.uffizi.it/en/professional-services/wewef).
