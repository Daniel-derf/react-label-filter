import styled from 'styled-components';
import { useState } from 'react';

const animalData = [
  { name: 'Eagle', cl: 'Birds' },
  { name: 'Penguin', cl: 'Birds' },
  { name: 'Parrot', cl: 'Birds' },
  { name: 'Lion', cl: 'Mammals' },
  { name: 'Tiger', cl: 'Mammals' },
  { name: 'Elephant', cl: 'Mammals' },
  { name: 'Cobra', cl: 'Reptiles' },
  { name: 'Lizard', cl: 'Reptiles' },
  { name: 'Tortoise', cl: 'Reptiles' },
  { name: 'Salmon', cl: 'Fish' },
  { name: 'Shark', cl: 'Fish' },
  { name: 'Trout', cl: 'Fish' },
];

const LabelFilter = () => {
  const [animals, setAnimals] = useState(animalData);
  const [filteredClasses, setFilteredClasses] = useState([]);

  const handleClassFilter = (c) => {
    let newFilteredClasses;

    if (filteredClasses.includes(c)) {
      if (filteredClasses.length == 1) {
        setAnimals(animalData);
        setFilteredClasses([])
        return;
      }
      
      newFilteredClasses = filteredClasses.filter((cl) => cl != c);
      
    } else newFilteredClasses = [...filteredClasses, c];

    const newAnimals = animalData.filter((a) =>
      newFilteredClasses.includes(a.cl)
    );

    setFilteredClasses(newFilteredClasses);
    setAnimals(newAnimals);
  };

  const animalClasses = Array.from(
    new Set(animalData.map((animal) => animal.cl))
  );

  return (
    <Wrapper>
      <div data-testid="labels-wrapper-id" className="label-container">
        {animalClasses.map((animalClass) => (
          <div
            onClick={() => handleClassFilter(animalClass)}
            data-testid="label-id"
            className={
              filteredClasses.includes(animalClass) ? 'active' : 'label'
            }
            key={animalClass}
          >
            {animalClass}
          </div>
        ))}
      </div>
      <div data-testid="tile-container-id" className="tile-container">
        {animals.map((animal) => (
          <div data-testid="animal-tile-id" className="tile" key={animal.name}>
            {animal.name}
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default LabelFilter;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: sans-serif;
  margin: 24px;
  gap: 24px;

  .label-container {
    display: flex;
    flex-direction: row;
    gap: 12px;

    .label {
      background-color: #fff;
      color: #333;
      border: 1px solid #333;
      border-radius: 4px;
      margin-bottom: 8px;
      padding: 6px 12px;
      cursor: pointer;
      transition: 0.1s ease-in-out;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  .tile-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;

    .tile {
      background-color: #333;
      color: #fff;
      padding: 12px;
      border-radius: 4px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;
      min-width: 120px;
    }
  }

  .active {
      background-color: #333;
      color: #fff;
      border: 1px solid #333;
      border-radius: 4px;
      margin-bottom: 8px;
      padding: 6px 12px;
      cursor: pointer;
      transition: 0.1s ease-in-out;

      &:hover {
        opacity: 0.8;
      }
  }
`;
