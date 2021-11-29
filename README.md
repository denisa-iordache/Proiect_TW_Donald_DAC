# Proiect_TW_Donald_DAC
Pentru realizarea aplicației vom avea nevoie de o bază de date care să conțină următoarele tabele:
# 1.	Studenți - cu câmpurile:
•	id_student – number not null <br />
•	nume - string <br />
•	prenume - string <br />
•	email – string unique <br />
•	username - string <br />
•	parola – string <br />
# 2.	Membri_proiecte - cu câmpurile:
•	id_proiect - number <br />
•	id_student_mp - number <br />
# 3.	Testeri_proiecte - cu câmpurile:
•	id_proiect - number <br />
•	id_student_tst - number <br />
# 4.	Proiecte - cu câmpurile:
•	id_proiect - number <br />
•	id_student_autor - number <br />
•	nume_proiect – string <br />
•	status_proiect -string <br />
•	link_repository - string <br />
# 5.	Buguri - cu câmpurile:
•	id_bug – number <br />
•	id_proiect - number <br />
•	id_tst - number <br />
•	severitate - string <br />
•	prioritate_de_rezolvare - string <br />
•	descriere - string <br />
•	link_commit_bug – string <br />
•	id_membru – number unique <br />
•	status_rezolvare - string <br />
•	link_commit_rezolvare – string <br />
Relațiile dintre tabele vor fi următoarele:
•	Studenți - Proiecte -> mulți-la-mulți 
Vom avea tabelele intermediare Membri-proiecte si Testeri-proiecte pentru a face legătura între Studenți și Proiecte.
•	Proiecte - Buguri –> 1-la-mulți
•	Studenți – Buguri:
a)	TST– Buguri -> 1-la-mulți
b)	MP – Buguri -> 1-la-1
Fiind de tip SPA, conținutul paginii web se va actualiza dinamic în funcție de selecțiile vizitatorului. În partea dreapta sus a paginii for exista doua butoane, „Sign Up” si „Sign In”. Prin apăsarea butonului de „Sign Up”, se va deschide o fereastra modală sub forma unui formular unde vor trebui introduse următoarele date: nume, prenume, email, nume de utilizator și parolă. Va fi realizată o verificare asupra email-ului, respectiv dacă acesta este instituțional, fiind o aplicație destinată studenților. Odată creat contul, orice utilizator va avea pe pagina de Home proiectele existente în baza de date a site-ului (pot avea unul din statusurile: Deschis spre testare/În testare /Închis).
Prin adăugarea unui proiect nou de către un utilizator (apăsarea butonului „Proiect nou”), acesta devine automat membru de proiect. La adăugarea unui proiect, acesta trebuie să specifice numele proiectului, să atașeze un link către repository-ul de GitHub unde este încărcat proiectul și să completeze numele și adresele de email ale coechipierilor săi. Prin adăugarea celorlalți membri, și aceștia vor fi adăugați în tabela membri_proiecte și statusul acestora va deveni „MP” (membru de proiect).
Un proiect adăugat poate fi modificat doar de către membri de proiect ai acestuia. Proiectul poate fi șters doar de către autorul acestuia. Statusul proiectului va putea fi schimbat în ,, Închis’’ doar de către autor, în momentul în care consideră că nu i se mai pot aduce îmbunătățiri proiectului, cu condiția ca toate bug-urile să aibă statusul „Rezolvat”, devenind inactiv butonul „Testează”.
Pentru utilizatorii care nu au statusul „MP”, aceștia au posibilitatea de a testa proiectele existente (cărora nu li s-a încheiat încă testarea – status: Deschis spre testare/În testare) prin apăsarea butonului „Testează”. Odată preluat un proiect spre testare, statusul acestuia se va schimba în „În testare”, iar statusul studentului în „TST” și va fi adăugat în tabela testeri_proiecte. De asemenea, din acest moment, se va putea accesa și opțiunea de „Raportează bug”. Deci, când testerul a încheiat testarea, dacă a găsit un bug în proiectul preluat, va putea să-l raporteze introducând severitatea, prioritatea de rezolvarea, descrierea bug-ului și atașând un link către commit-ul din repository-ul proiectului unde a fost identificat bug-ul.
Odată trasmis bug-ul, acesta nu va mai putea fi modificat și va apărea în lista bug-urilor proiectului respectiv, pentru ca membrii de proiect să-l poată prelua spre rezolvare (un membru nu poate avea simultan 2 sau mai multe bug-uri de rezolvat, lucru marcat în baza de date prin restricția unique pe câmpul id_mp din tabela buguri). Bug-urile vor avea un status de rezolvare (Nepreluat - Roșu/În rezolvare - Galben/Rezolvat - Verde), putând fi preluate doar cele cu statusul „Nepreluat”. Pentru marcarea unui bug ca „Rezolvat” va fi nevoie de atașarea link-ului aferent commit-ului ce conține rezolvarea bug-ului. De asemenea, statusul bug-ului poate fi schimbat de către orice membru de echipă dacă acesta consideră că a fost comisă o eroare în rezolvarea sau raportarea acestuia. 
Bug-urile aferente fiecărui proiect vor fi vizibile pentru toți utilizatorii pentru a exclude posibilitatea în care același bug să fie sesizat de către doi testeri. În momentul finalizării testării, adică după transmiterea bug-ului, studentului i se va șterge statusul de „TST”, putând să-l primească înapoi la o testare ulterioară.
De asemenea, un utilizator poate fi la un moment dat doar tester sau doar membru de proiect, titlurile neputând fi disponibile simultan, adică în momentul în care un student se oferă tester, va deveni inactiv butonul „Proiect nou”, iar când un student este membru de proiect, va deveni inactiv butonul „Testează”.
