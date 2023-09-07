# Florentiner Maler 1400-1450
Eine Website mit Daten und Visualisierungen über Florentiner Maler des 15. Jahrhunderts.

Dies ist das Repositorium für meine Masterarbeit im [MA Cultural Data Studies](https://www.uni-marburg.de/de/mcdci/studium/ma-cds) am [Marburg Center for Digital Culture and Infrastructure](https://www.uni-marburg.de/de/mcdci). 

Anmerkungen und Fehlermeldungen bitte an Toni Massenberg, Antonia.Massenberg@uni-marburg.de.


## Inhalt
Die Daten in diesem Projekt stammen aus den Florentiner Catasto-Steuerdaten der Jahre 1427, 1431, 1433, 1442, 1447, 1451 und 1458, älteren Prestanze-Listen von 1400 und 1410/1412, Büchern der Lukasgilde und der Arte dei Medici e Speziali sowie zusätzlicher Archivmaterialien, aufbereitet durch Werner Jacobsen in "Die Maler von Florenz zu Beginn der Renaissance", München 2001.

Inhaltliche Anmerkungen sind auch den begleitenden Texten auf der [Projektwebsite](https://tonimassenberg.github.io/FlorentinerMaler/index.html) zu entnehmen.

## Nutzung der ```painters-master.csv```
In der Tabelle ```painters-master.csv``` wurden grundlegende Daten zu den 313 zwischen 1400 und 1450 in Florenz nachweisbaren Malern aufbereitet. Diese beziehen sich vor allem auf die Angaben im Regestenteil von "Die Maler von Florenz", andernfalls befinden sich in der Spalte "Zuschreibungsdiskussion Seite" ein Verweis auf den Ort der Information im Buch.
Die Spalten zu ```name```, ```zweitname```, ```birth```, ```death``` richten sich nach dem [MIDAS-Handbuch](https://www.online.uni-marburg.de/lido/midas-lido-crm-wiki/index.php/MIDAS). Wo vorhanden wurden die GND- und Wikidata-IDs ergänzt. Die Spalte ```heute noch berühmt?``` richtet sich nach Jacobsens Einschätzung in "Die Maler von Florenz", S. 60, die Spalte ```zuschreibungsfähig?``` für die Wand- und Tafelmaler sowie Miniaturisten gleichermaßen nach S. 207f. Die Abkürzungen dort sind: ü = Existenz eines Bildes ist überliefert, er = Bild ist erhalten, dok = die Mitarbeit am Bild ist dokumentiert, sign = das Bild ist signiert, in Werkstatt = der Maler ist zwar nicht direkt als Mitarbeiter an einem erhaltenen Bild dokumentiert, aber zum Entstehungszeitpunkt als Mitarbeiter des überlieferten Malers nachgewiesen.

Die ```Berufsgruppe``` richtet sich nach Jacobsens Einteilung (Erklärung auf der [Projektwebsite](https://tonimassenberg.github.io/FlorentinerMaler/index.html#grundbegriffebutton)), ```job``` ist die vereinheitlichte Formulierung desselben.

 Unter den Spaltennamen ```Sohn```, ```Vater```, ```Bruder```, ```andere Verwandschaft```, ```Ausbildung```, ```Arbeitsverhältnis``` und ```Partner``` wurden Jacobsens Angaben zu den jeweiligen Verbindungen eines Künstlers übernommen. Unter den Spaltennamen ```fatherOf```, ```brotherOf```, ```uncleOf```, ```otherFamily```, ```teacherOf``` und ```masterOf``` wurde dieser Informationsgehalt standardisiert: einerseits durch die standardisierte Schreibweise des Namens (```label```) der Person, andererseits indem die Eintragungsrichtung standardisiert und von Dopplungen befreit wurde, z.B. steht der Sohn immer beim Vater, nicht der Vater beim Sohn.

## Nutzung der Kartenvisualisierungsdaten
Alle Dateien zu den Kartenvisualisierungen befinden sich im Ordner ```assets```.
Der Plan ```basicmap``` (als JPG und SVG vorhanden) basiert auf dem Stadtplan des Ruggero Ricci von 1831, mit Abwandlungen in Anlehnung an die Pläne in "Die Maler von Florenz".
Die Annotationen in den JSON-Dateien wurden im [VGG Image Annotator](https://www.robots.ox.ac.uk/~vgg/software/via/) erstellt. Eine inhaltliche Erklärung findet sich sich im [Begleittext der Karte](https://tonimassenberg.github.io/FlorentinerMaler/map.html). Die Datei zum jeweiligen Plan enthält die Koordinaten sowie beschreibende Informationen zu den Annotationen. Unter Nutzung der modularen Funktionen in ```map.js``` können die unterschiedlichen Darstellungsweisen der interaktiven Karte übernommen werden. 

Die Namen der Pläne entsprechen der Nummerierung in „Die Maler von Florenz“. Die drei JSON-Dateien mit den Daten für Plan 1-3 sind in der Form vergleichbar, sie enthalten jeweils Attribute für die Koordinaten, den Namen, Typ des dargestellten Bereiches, das durchschnittliche Einkommen ```avgWealth``` der Region in Florin (nach Jacobsen S. 28) und die Koordinaten eines Punktes ```middlePoint```, der zur Platzierung der Beschriftung der Region dient. Darauf baut auch der Choropleth-Plan auf, der die Gonfaloni als Flächen zeigt, deren Farbe sich aus ```avgWealth``` ergibt. Der Plan ```churches``` markiert die Position der Kirchen in Florenz, getrennt in Hauptkirchen und Pfarrkirchen.
Pläne 6-17 zeigen die Wohnorte der Florentiner Maler, Plan 18 zeigt in beschrifteter Form die Wohnorte ausgewählter Renaissancekünstler. Entsprechend enthalten die JSON-Dateien dazu neben den Koordinaten des Punktes die Berufsgruppe ```job``` des Malers, die ```certainty``` für die Genauigkeit der Angabe (der Straßennamen oder nur der Pfarrsprengel sind bekannt), und den ```type``` (Heim oder Werkstatt).


## Nutzung der Netzwerkdaten
Alle zur Generierung der Netzwerke notwendigen Daten finden sich im Ordner ```network```.
Die grundlegende Netzwerkfunktionalität wurde über das Plugin [sigmaExporter](https://github.com/oxfordinternetinstitute/gephi-plugins/tree/sigmaexporter-plugin/modules/sigmaExporter) aus Gephi 0.9.4 generiert. Sowohl die JavaScript- als auch die CSS-Dateien wurden für das vorliegende Projekt stark modifiziert, die Herkunft der jeweiligen Dateien und die Abwandlungen sind im Code dokumentiert.
Die Daten unter dem Namen ```regesten``` basieren auf den Regestenteil in "Die Maler von Florenz", die Dateien unter ```chapter8``` entsprechen Jacobsens Erläuterungen in Kapitel 8 von "Die Maler von Florenz".
Die ```.config```-Dateien bestimmen die verwendete Datengrundlage und Darstellungsart der beiden Netzwerke. Die jeweiligen JSON-Dateien enthalten die Knoten- und Kanteninformationen. Durch die GEXF- und Gephi-Dateien können Sie die Netzwerke direkt in Gephi importieren (über diesen Weg lassen sich auch alle Netzwerkverbindungen im CSV-Format exportieren) oder sie auf GephiLite ([Regesten-Netzwerk](https://gephi.org/gephi-lite/?gexf=https://tonimassenberg.github.io/FlorentinerMaler/network/regesten.gexf), [Kapitel8-Netzwerk](https://gephi.org/gephi-lite/?gexf=https://tonimassenberg.github.io/FlorentinerMaler/network/chapter8.gexf)) erkunden. 

Aus den einleitenden Kurztexten im Regestenteil lassen sich für 119 Maler Familienmitglieder (Väter, Onkel, Brüder, Schwager oder unbestimmte Verwandschaftsverhältnisse) ableiten, professionelle Verbindungen sind für 37 Maler angegeben. In der Aufbereitung für dieses Netzwerk wurden wechselseitige Beziehungen, die Jacobsen bei einem der Beteiligten angibt, sowie implizierte Verhältnisse (wie die Onkel-Neffe-Beziehungen, die implizit aus den Vater-Sohn- sowie Bruderverhältnissen hervorgehen) ebenfalls berücksichtigt. Dieses Netzwerk visualisiert die nachweisbaren, im Regestenteil aufgeführten Verbindungen sowie die impliziten Verbindungen, die sich direkt daraus ergeben und die daher weitgehend verlässlich sind. 

Kapitel 8 gibt für 42 Maler Familienverbindungen und für 57 Maler professionelle Verbindungen an. Dieses zweite Netzwerk weicht von den möglichst neutral gehaltenen Regesten-Informationen ab: Da hier Jacobsens Diskussionskapitel dargestellt wird, wurde zunächst darauf verzichtet, implizite Verbindungen wie die Onkel-Neffe-Beziehung zu berücksichtigen, es sei denn diese wurde in Form einer professionellen Beziehung diskutiert. Es wird nur dargestellt, was in diesem Kapitel ausdrücklich erwähnt wird. 
Dazu gehören zusätzliche Verbindungen, die sich nicht im Regestenteil niederschlagen: ```friendOf``` fasst alle Fälle zusammen, in denen Maler sich nachweislich gut kannten, weil sie z.B. gegenseitig Verträge bezeugten oder füreinander Empfehlungsschreiben verfassten. ```PartnerOf``` meint eine gleichberechtigte Werkstattpartnerschaft zwischen Meistern. ```WorkedWith``` bezeichnet eine Verbindung, bei der Maler nachweislich über längere Zeit zusammen gearbeitet haben, z.B. an der gleichzeitigen Ausmalung derselben Kapelle. ```CommonWork``` meint die losere Zusammenarbeit, bei der ein Werk nachweislich auf mehrere Maler zurückzuführen ist, die dafür aber nicht zwangsweise viel interagiert haben müssen, wie mehrere Miniaturisten am selben Kodex oder die Fertigstellung eines von einem anderen Maler begonnenen Werks nach dessen Tod. Details lassen sich auf der jeweils bei einem der betreffenden Maler in der ```painters-master.csv``` sowie auf der angegebenen Seite in "Die Maler von Florenz" nachlesen.
In diesem Graphen sind die Kanten gewichtet. Wenn Jacobsen betont, die Verbindung sei besonders eng oder eher vage, wurde um einen Punkt erhöht oder verringert. Die Punktevergabe orientiert sich an der anzunehmenden Relevanz des Aspekts für die Attributionsdiskussion. Standardwerte: ```teacherOf``` = 3, ```masterOf``` = 2, ```partnerOf``` = 2, ```brotherOf``` = 2, ```fatherOf``` = 2, ```friendOf``` = 1, ```otherFamily``` = 1, ```workedWith``` = 1, ```commonWork``` = 1.
Die Knotentabelle zu Kapitel 8 beinhaltet 21 zusätzliche Personen, die überhaupt nicht im Regestenteil von „Die Maler von Florenz“ vorkommen, weil sie vor oder nach dem berücksichtigen Zeitraum wirkten (z.B. Agnolo di Taddeo Gaddi), keine Maler waren (z.B. Lorenzo di Cione Ghiberti) oder nicht lang genug in Florenz waren um dort direkt nachweisbar zu sein. Im Netzwerk wurden sie dennoch berücksichtigt, da sie aufgrund ihrer Verbindungen zu relevanten Malern von Jacobsen in Kapitel 8 in nennenswertem Maße mitdiskutiert werden und somit wichtige Verbindungen ermöglichen. 


## Lizenz

[GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/)

Bitte beachten Sie, dass zur vollständigen Urheberangabe dieser Daten auch die Zitation nach Werner Jacobsen, "Die Maler von Florenz zu Beginn der Renaissance", München 2001 gehört.

Der Ordner ```network``` enthält Code von [SigmaJS](https://github.com/jacomyal/sigma.js/), veröffentlicht unter der MIT License.

Bild Paolo_di_Dono_Die_Schlacht_von_San_Romano.jpg: Paolo Uccello, "Die Schlacht von San Romano", ca. 1435-1440, &copy; [Uffizi Galleries](https://www.uffizi.it/en/artworks/battle-of-san-romano). Die [Lizenz](https://www.uffizi.it/en/professional-services/wewef) ist hier einzusehen.
