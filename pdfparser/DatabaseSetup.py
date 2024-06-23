from pymilvus import connections, Collection, FieldSchema, CollectionSchema, DataType

def databse_search(self, word_query_vector, image_query_vector):
    connections.connect("default", host = "localhost", port = "19530")

    #Define collection schema
    fields = [
        FieldSchema(name = "id", dtype = DataType.INT64, is_primary = True),
        FieldSchema(name = "word_vector", dtype = DataType.FLOAT_VECTOR, dim = 512),
        FieldSchema(name = "image_vector", dtype = DataType.FLOAT_VECTOR, dim = 512)
    ]
    schema = CollectionSchema(fields, "A collection to store my vectors")

    #Create collection
    collection = Collection("my_vectors", schema)

    #Insert vectors
    word_vectors = [your word vectors here]             #we need to put the stuff here
    image_vectors = [your image vectors here]           #we need to put the stuff here
    collection.insert([
        [i for i in range(len(word_vectors))],
        word_vectors,
        image_vectors
    ])

    collection.create_index("word_vector", index_params = {"metric_type": "L2", "index_type": "IVF_FLAT", "params": {"nlist": 1024}})
    collection.create_index("image_vector", index_params = {"metric_type": "L2", "index_type": "IVF_FLAT", "params": {"nlist": 1024}})

    search_params = {
        "metric_type": "L2",
        "params": {"nprobe": 10},
    }

    hybrid_results = collection.search(
        data=[
            [image_query_vector],  # Your query image vector
            [word_query_vector]    # Your query word vector
        ],
        anns_field=["image_vector", "word_vector"],  # Search both fields
        param=search_params,
        limit=5,
        expr=None,
        output_fields=["text", "image"],
        consistency_level="Strong"
    )
