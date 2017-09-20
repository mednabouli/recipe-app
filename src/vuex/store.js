import Vue from 'vue'
import Vuex from 'vuex'
import Cosmic from 'cosmicjs';
import config from '../config/config';
import _ from 'lodash';

Vue.use(Vuex)

// the root, initial state object
const state = {
    recipes: [
    ]
}

// define the possible getters that can be applied to our state
const getters = {
    recipes(state){
        return state.recipes;
    },
    recipe(state){
        return (keyword) => _.find(state.recipes,['_id', keyword]);
    }
}

// define the possible mutations that can be applied to our state
const mutations = {
    GET_RECIPES(state,payload){
        console.log(payload);
        state.recipes = payload;
    }
}


// define the possible actions that can be applied to our state
const actions = {
    getRecipes(context){
        Cosmic.getObjectsByType(config, { type_slug: 'recipes' }, (err, res) => {
            if(!err){
                context.commit('GET_RECIPES',_.map(res.objects.all, (recipe) =>{
                    recipe.metadata.youtube_id = `https://www.youtube.com/embed/${recipe.metadata.youtube_id}`;
                    return recipe;
                }));
            }
            else
            {
                console.log(err.statusText);
            }
        });
    }
}

// create the Vuex instance by combining the state and mutations objects
// then export the Vuex store for use by our components
export default new Vuex.Store({
    strict: true,
    state,
    getters,
    mutations,
    actions
})