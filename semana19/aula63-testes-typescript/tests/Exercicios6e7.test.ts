import {PostDatabase} from '../src/Exercicios6e7'

describe("Labook post tests", () => {
    afterAll(async()=>{
        const postDatabase = new PostDatabase;

        await postDatabase.deletePostById("test-post")
        await postDatabase.deletePostById("test-post2")
        await postDatabase.destroyConnection();
    })

    test("Create post", async()=>{    
        const postDB = new PostDatabase;

        await postDB.createPost("e03cdad9-2f22-4ddc-af74-0cd1b48df4bb", "test-post", "this is a test post");

        const post = await postDB.getPostById("test-post");

        expect(post).toEqual({id: "test-post", creator_id: "e03cdad9-2f22-4ddc-af74-0cd1b48df4bb", description: "this is a test post"})
    })

    test("Create two posts with same id", async()=>{
        try {
            const postDB = new PostDatabase;

            await postDB.createPost("e03cdad9-2f22-4ddc-af74-0cd1b48df4bb", "test-post2", "this is another test post");
            await postDB.createPost("e03cdad9-2f22-4ddc-af74-0cd1b48df4bb", "test-post2", "this is another test post");
        } catch (error) {
            expect(error.message).toEqual("Duplicate entry 'test-post2' for key 'PRIMARY'")
        }
    })
})