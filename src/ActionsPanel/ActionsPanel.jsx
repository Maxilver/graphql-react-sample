import { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";

import { Panel } from 'primereact/panel';
import { Dropdown } from "primereact/dropdown";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { InputSwitch } from "primereact/inputswitch";

import { GET_DIMENSIONS, GET_LOCATIONS_BY_DIMENSION, selectedDimensionVar, SET_TODO } from "../apollo/index.js";

export default function ActionsPanel () {
  const toastRef = useRef(null);

  // Dropdown options query
  const { loading, error, data } = useQuery(GET_DIMENSIONS);

  // Reactive variable connection to propagate to other queries
  const selectedDimension = useReactiveVar(selectedDimensionVar);

  // Mutation related variables.
  const [createTodo, mutation] = useMutation(SET_TODO);

  const [modalVisible, setModalVisible] = useState(false);
  const [todoTitle, setTodoTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Auto set the dropdown value when the options fetched.
    if (data?.first?.results[0] && !selectedDimension) {
      selectedDimensionVar(data?.first?.results[0].dimension);
    }
  }, [data, selectedDimension]);

  // Dimension options. We don't need the first + second + third logic in a real life. Just a quick hack for Public API limitations.
  const dimensions = data
    ? [...(new Set([...data.first.results, ...data.second.results, ...data.third.results].map(item => item.dimension)))]
    : [];

  // Write the calue to Apollo variable. All the related queries will refetch automatically if referenced.
  const handleSelect = (e) => selectedDimensionVar(e.value);

  const handleMutation = async () => {
    try {
      const result = await createTodo({
        // regetchQueries allow ius to trigger Queries to update.
        refetchQueries: [
          // By Query with Variables:
          {
            query: GET_LOCATIONS_BY_DIMENSION,
            variables: { dimension: selectedDimension },
          },
          // By Query Name from gql`` if it's a plain query.
          'GetLocations',
        ],
        variables: { title: todoTitle, completed }
      });

      console.log('Mutation Result:', result.data.createTodo);
      // Example of showing the mutation response on the interface bia PrimeReact Toast.
      toastRef.current.show({
        severity: result.data.createTodo.completed ? 'success' : 'info',
        summary: 'Item Created',
        detail: `Item ID: ${result.data.createTodo.id}, title: ${result.data.createTodo.title} -- ${result.data.createTodo.completed ? 'COMPLETED!' : 'OPEN'}`,
        life: 3000
      });

      setTodoTitle('');
      setCompleted(false);
      setModalVisible(false);
    } catch (err) {
      console.error('Mutation Error:', err);
      toastRef.current.show({
        severity: 'error',
        summary: 'Error',
        detail: mutation.error.message,
        life: 3000
      });
    }
  };

  // Handle loading.
  if (loading) return <ProgressSpinner style={{ width: '50px', height: '50px', display: 'block', margin: 'auto' }}/>;

  return (
    <Panel header="Actions" className="mb-4 flex-content">
      <Toast ref={toastRef}/>

      <Dropdown
        value={selectedDimension}
        options={dimensions}
        onChange={handleSelect}
        placeholder="Select a Location"
      />

      {/*Mutation Modal*/}
      <Button
        label="Mutation Modal"
        className="ml-2"
        severity="warning"
        icon="pi pi-external-link"
        style={{ background: '#3b82f6' }}
        onClick={() => setModalVisible(true)}
      />

      <Dialog
        header="Run Mutation"
        visible={modalVisible}
        style={{ width: '50vw' }}
        onHide={() => setModalVisible(false)} // Close modal on hide
      >

        <div className="mb-5">
          <span className="p-float-label mb-2">
            <InputText id="todo-title" value={todoTitle} onChange={(e) => setTodoTitle(e.target.value)}/>
            <label htmlFor="todo-title">Enter Title</label>
          </span>

          <InputSwitch
            checked={completed}
            onChange={(e) => setCompleted(e.value)}
          />

        </div>

        <Button
          icon="pi pi-check"
          className="p-button-text"
          label={mutation.loading ? 'Creating...' : 'Create Todo'}
          onClick={handleMutation}
          disabled={mutation.loading || !todoTitle}
        />
        <Button
          label="Close"
          icon="pi pi-times"
          className="p-button-text p-button-danger ml-3"
          onClick={() => setModalVisible(false)}
        />
      </Dialog>
    </Panel>
  )
}
