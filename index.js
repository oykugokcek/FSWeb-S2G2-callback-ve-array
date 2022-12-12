const { template } = require('@babel/core');
const { fifaData } = require('./fifa.js')


/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
fifaData.forEach(item => {
	if (item["Year"] === 2014) {
		console.log(item["Home Team Name"]);

	}

})
//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
let final2014 = fifaData.filter(item => item.Year === 2014);

final2014.forEach(item => console.log(item["Away Team Name"]));


//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)




//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)

//(e) 2014 Dünya kupası finali kazananı*/
console.clear();
let final2014Winner = final2014.map(element => {
	if (element["Home Team Goals"] > element["Away Team Goals"]) {
		return element["Home Team Name"];
	}
	else if (element["Away Team Goals"] > element["Home Team Goals"]) {
		return element["Away Team Name"];
	}
	else
		return element["Win conditions"].split(" win ")[0];

});
console.log("!!!");
console.log(final2014Winner[0]);

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(dataArray) {
	const finalGames = dataArray.filter(mac => mac.Stage === "Final");
	return finalGames;
}
console.log(Finaller(fifaData));

/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(dataArray, chooseFinalGames) {
	let finalGames = chooseFinalGames(dataArray);

	let yearsOfFinalGames = finalGames.map(mac => mac["Year"]);
	return yearsOfFinalGames;
}

console.log(Yillar(fifaData, Finaller));
/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */

function Kazananlar(dataArray, chooseFinalGames) {
	let finalGames = chooseFinalGames(dataArray);
	let winnersOfFinalGames = finalGames.map(element => {
		if (element["Home Team Goals"] > element["Away Team Goals"]) {
			return element["Home Team Name"];
		}
		else if (element["Away Team Goals"] > element["Home Team Goals"]) {
			return element["Away Team Name"];
		}
		else
			return element["Win conditions"].split(" win ")[0];

	});
	return winnersOfFinalGames;
}

console.log(Kazananlar(fifaData, Finaller));
//

/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(dataArray, chooseFinalGames, yearsArrayFunction, winnersOfFinalGamesFunction) {
	const finalGames = chooseFinalGames(dataArray);
	const result = finalGames.map((item, i) =>
		`${item["Year"]} yılında, ${winnersOfFinalGamesFunction(dataArray, chooseFinalGames)[i]} dünya kupasını kazandı!`);
	return result;
	// 	let str = [];
	// 	for (let i = 0; i<finalGames.length; i++){
	// 		str.push(yearsArrayFunction(dataArray, chooseFinalGames)[i] + " yılında, " 
	// + winnersOfFinalGamesFunction(dataArray, chooseFinalGames)[i] + " dünya kupasını kazandı!");
	// 	}
	// 	return str;
}
console.log(YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar));

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(chooseFinalGames) {
	let sumOfTheGoals = chooseFinalGames.reduce((accumulator, mac) => accumulator + mac["Home Team Goals"] + mac["Away Team Goals"], 0);

	return (sumOfTheGoals / chooseFinalGames.length).toFixed(2);

}

console.log(OrtalamaGolSayisi(Finaller(fifaData)));

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(dataArray, abbreviation) {
	let winScore = 0;
	let requestedTeam ="";
	dataArray.forEach(item => {
		if (item["Home Team Initials"] === abbreviation)
		{
			requestedTeam = item["Home Team Name"].toLowerCase();
		}	
		else if (item["Away Team Initials"] === abbreviation)
		{
			requestedTeam = item["Away Team Name"].toLowerCase();
		}
			
	})

	dataArray.forEach(item => {
		if ((item["Home Team Goals"] > item["Away Team Goals"]) && item["Home Team Initials"] === abbreviation) {
			winScore++;
		}
		else if ((item["Away Team Goals"] > item["Home Team Goals"]) && item["Away Team Initials"] === abbreviation) {
			winScore++;
		}
		else if (item["Win conditions"].split(" win ")[0].toLowerCase() === requestedTeam) {
			winScore++;
		}
	})

	return winScore;

}

 console.log(UlkelerinKazanmaSayilari(fifaData, "FRA"));

/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */
console.clear();
function EnCokGolAtan(dataArray) {

	let homeTeamNames = [];
	dataArray.forEach(item => homeTeamNames.push(item["Home Team Name"]));
	let awayTeamNames = [];
	dataArray.forEach(item => homeTeamNames.push(item["Away Team Name"]));
	let teamNames = arrayUnique(homeTeamNames.concat(awayTeamNames));
	let goalObjects = [];
	let totalGoals = 0;
	let maxGoalTeam = "";
	for (let j = 0; j < dataArray.length; j++) {
		for (let i = 0; i < teamNames.length; i++) {
			if (dataArray[j]["Home Team Name"] === teamNames[i]) {

				let str1 = teamNames[i];
				let goals = dataArray[j]["Home Team Goals"];
				totalGoals += goals;
				let obj = {
					name: str1,
					goals: totalGoals
				}
				goalObjects.push(obj);

			}
			if (dataArray[j]["Away Team Name"] === teamNames[i]) {
				let str1 = teamNames[i];
				let goals = dataArray[j]["Away Team Goals"];
				totalGoals += goals;
				let obj = {
					name: str1,
					goals: totalGoals
				}
				goalObjects.push(obj);
			}
		}
	}
	for (let i = 0; i < goalObjects.length; i++) {
		let maxGoals = 0;
		let maxIndex = 0;
		if (goalObjects[i].goals > maxGoals) {
			maxGoals = goalObjects;
			maxGoalTeam = goalObjects[i].name;
		}
	}
	for (let i = 0; i < goalObjects.length; i++) {
		if (goalObjects[i]["name"] === "Netherlands")
			console.log(goalObjects[i]);
	}


	return maxGoalTeam;


}
function arrayUnique(array) {
	var a = array.concat();
	for (var i = 0; i < a.length; ++i) {
		for (var j = i + 1; j < a.length; ++j) {
			if (a[i] === a[j])
				a.splice(j--, 1);
		}
	}

	return a;
}
console.log(EnCokGolAtan(fifaData));

/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(dataArray) {
}
/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa() {
	console.log('Kodlar çalışıyor');
	return 'as';
}
sa();
module.exports = {
	sa,
	Finaller,
	Yillar,
	Kazananlar,
	YillaraGoreKazananlar,
	OrtalamaGolSayisi
}
