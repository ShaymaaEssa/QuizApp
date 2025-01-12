export async function getCategoryApi (){
    try{
        const api = await fetch(`https://opentdb.com/api_category.php`);
    
        const response = await api.json();
        populateCategory(response);
        
    } catch (error){
        console.log(error) 
    }
    
}

function populateCategory(data){
    const select = document.getElementById('category-select');
    data.trivia_categories.forEach(item => {
        console.log(item);
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.name;
        select.appendChild(option);
    });


}



export async function getQuestionsApi(category, difficulty, questionsNum){
    try{
        const api = await fetch(`https://opentdb.com/api.php?amount=${questionsNum}&category=${category}&difficulty=${difficulty}`);
    
        console.log(`https://opentdb.com/api.php?amount=${questionsNum}&category=${category}&difficulty=${difficulty}`);
        
        const response = await api.json();
        console.log(response.results);
        return response.results;
        
    } catch (error){
        console.log(error) 
    }
}