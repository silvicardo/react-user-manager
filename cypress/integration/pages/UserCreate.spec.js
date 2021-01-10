import lang from "../../../src/lang";

describe('USER CREATE PAGE', function(){

    describe('initial load', function(){

        it('is reachable', function(){

        })

        it('initially shows empty creation form', function(){

        })

        it('initially shows an empty list of friends with select and create buttons', function(){

        })

    })

    describe('new user friends', function(){

        it('can select new friend for creating user from existing users', function(){

        })

        it('can remove existing friend for creating user', function(){

        })

    })

    describe('stacking views', function(){

        it('stacks a new create user view when clicking on create new friend button', function(){

        })

        it('asks the user to save or abort the current user creation on clicking on a lower item in the stack when two or more creation are stacked', function(){

        })

    })


    describe('submit', function(){

        describe('validation', function(){

            it('shows validation message and stops submit with empty user name', function(){

            })

        })

        describe('valid data submit handling', function(){

            it('submits user and brings back to list page showing created user on top of the list', function(){

            })

            it('silently attempts submit twice and succeeds on second attempt', function(){

            })

            it('silently attempts submit twice and fails all attempts showing error message with retry button', function(){

            })

            it('retry button submit succeeds and brings back to list page showing created user on top of the list', function(){

            })

        })

    })

})