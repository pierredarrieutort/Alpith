<?php

namespace App\Controller;

use App\Entity\Episode;
use App\Entity\Season;
use App\Entity\Serie;
use App\Repository\SeasonRepository;
use App\Repository\SerieRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;

class SerieController extends AbstractController
{

    /**
     * @var SerieRepository
     */

    private $repository;

    public function __construct(SerieRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @Route("/series")
     * @return Response
     */
    public function index(): Response
    {
        $currentpage = 'series';
        $series = $this->repository->findAll();

        return $this->render('series.html.twig', [
            'currentpage' => $currentpage,
            'series' => $series
        ]);
    }

    /**
     * @Route("/series/serie-{serieid}")
     * @return Response
     */
    public function show($serieid): Response
    {
        $serie = $this->repository->find($serieid);

        $seasons = $this->getDoctrine()
            ->getRepository(Season::class)
            ->findAll();

        return $this->render('serie.html.twig', [
            'serie' => $serie,
            'seasons' => $seasons
        ]);
    }

    /**
     * @Route("/series/serie-{serieid}/season-{seasonid}")
     * @return Response
     */
    public function season($seasonid): Response
    {

        $season = $this->getDoctrine()
            ->getRepository(Season::class)
            ->find($seasonid);

        $episodes = $this->getDoctrine()
            ->getRepository(Episode::class)
            ->findAll();

        return $this->render('season.html.twig', [
            'episodes' => $episodes,
            'season' => $season
        ]);
    }

    /**
     * @Route("/series/serie-{serieid}/season-{seasonid}/episode-{episodeid}")
     * @return Response
     */
    public function episode($episodeid): Response
    {

        $episode = $this->getDoctrine()
            ->getRepository(Episode::class)
            ->find($episodeid);

        return $this->render('episode.html.twig', [
            'episode' => $episode
        ]);
    }
}
