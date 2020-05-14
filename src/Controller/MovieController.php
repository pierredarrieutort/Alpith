<?php

namespace App\Controller;

use App\Entity\Movie;
use App\Repository\MovieRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;

class MovieController extends AbstractController
{

    /**
     * @var MovieRepository
     */

    private $repository;

    public function __construct(MovieRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @Route("/movies")
     * @return Response
     */
    public function index(): Response
    {
        $currentpage = 'movies';
        $movies = $this->repository->findAll();
        return $this->render('movies.html.twig', [
            'currentpage' => $currentpage,
            'movies' => $movies
        ]);
    }

    /**
     * @Route("/movies/movie-{id}")
     * @return Response
     */
    public function show($id): Response
    {
        $movie = $this->repository->find($id);

        return $this->render('media-player.html.twig', [
            'movie' => $movie
        ]);
    }
}
